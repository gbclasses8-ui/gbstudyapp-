/* GB STUDY Firebase bridge. This is a setup-ready integration layer.
   It activates only after firebase-config.js has valid project values. */
(function () {
  const status = (msg, ok=false) => {
    let el = document.getElementById('gbFirebaseStatus');
    if (!el) { el=document.createElement('div'); el.id='gbFirebaseStatus'; el.style.cssText='position:fixed;bottom:8px;left:8px;z-index:99999;max-width:90vw;padding:7px 10px;border-radius:9px;background:#171717;color:#f6d578;font:12px system-ui;box-shadow:0 2px 12px #0005'; document.body.appendChild(el); }
    el.textContent='GB STUDY cloud: '+msg; el.style.color=ok?'#b7f7c4':'#f6d578';
  };
  const cfg = window.GB_FIREBASE_CONFIG;
  if (!cfg || !cfg.projectId || cfg.projectId === 'YOUR_PROJECT_ID' || String(cfg.apiKey||'').startsWith('PASTE_')) {
    status('not connected — add your Firebase web config');
    window.GBCloud = { connected:false, status };
    return;
  }
  try {
    if (!window.firebase) throw new Error('Firebase SDK did not load');
    const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(cfg);
    const auth = firebase.auth();
    const db = firebase.firestore();
    window.GBCloud = {
      connected:true, auth, db, status,
      signUp: (email,password) => auth.createUserWithEmailAndPassword(email,password),
      signIn: (email,password) => auth.signInWithEmailAndPassword(email,password),
      signOut: () => auth.signOut(),
      onAuth: cb => auth.onAuthStateChanged(cb),
      async saveUserProfile(user, extra={}) {
        if (!user) throw new Error('Sign in first');
        return db.collection('users').doc(user.uid).set({email:user.email||'', displayName:user.displayName||'', updatedAt:firebase.firestore.FieldValue.serverTimestamp(), ...extra},{merge:true});
      },
      async sendChat(text) {
        const user=auth.currentUser;
        if (!user) throw new Error('Sign in to chat');
        const clean=String(text||'').trim().slice(0,2000);
        if (!clean) throw new Error('Message is empty');
        return db.collection('chatMessages').add({uid:user.uid,email:user.email||'',text:clean,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
      },
      watchChat(cb, onError=console.error) {
        return db.collection('chatMessages').orderBy('createdAt','asc').limitToLast(100).onSnapshot(s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))),onError);
      },
      async getPublicPlatforms() {
        const doc=await db.collection('appData').doc('public').get();
        return doc.exists ? (doc.data().platforms||[]) : [];
      },
      async savePublicPlatforms(platforms) {
        const user=auth.currentUser;
        if (!user) throw new Error('Admin sign-in required');
        const token=await user.getIdTokenResult(true);
        if (token.claims.admin !== true) throw new Error('This account has no server-authorized admin claim');
        return db.collection('appData').doc('public').set({platforms,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
      }
    };
    auth.onAuthStateChanged(user=>status(user?'signed in as '+(user.email||'user'):'connected; signed out',true));
    status('connected; authentication and Firestore ready',true);
  } catch (e) { status('setup error: '+e.message); window.GBCloud={connected:false,status}; }
})();
