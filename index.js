const core = require("@actions/core");
const admin = require("firebase-admin");


// most @actions toolkit packages have async methods
async function run() {
  const firebaseConfig = {
    apiKey: core.getInput("apiKey"),
    authDomain: core.getInput("authDomain"),
    projectId: core.getInput("projectId")
  };

  try {
    if (admin.apps.length === 0) {
      admin.initializeApp(firebaseConfig);
    }
    console.log("app initialized")
  } catch (error) {
    console.log(error);
    console.log("cannot initialize app")
  }

  const docValue = await admin.firestore()
      .collection(core.getInput("collectionName"))
      .doc(core.getInput("docName"))
      .get()

  console.log(docValue);
  core.setOutput("firestoreValue", JSON.stringify(docValue))
}

run();
