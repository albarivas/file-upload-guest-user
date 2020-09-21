import { LightningElement, api } from "lwc";
import doEncrypt from "@salesforce/apex/UserCryptoService.doEncrypt";

export default class FileUploadExample extends LightningElement {
  @api
  myRecordId; // Id of the record to which you want to attach the uploaded file
  encryptedToken;

  get acceptedFormats() {
    return [".pdf", ".png"];
  }

  // For guest users, we cannot attach the uploaded file to the record by using the record-id property
  // in the lightning-file-upload component. Instead, we'll store it encrypted in a field of ContentVersion.
  // A trigger needs to be created in ContentVersion, to read that field and attach the uploaded file
  // to the record. See pattern 6 in
  // https://www.learncommunitycloud.com/s/article/Guest-User-Record-Access-Development-Best-Practices#Pattern6
  connectedCallback() {
    doEncrypt(this.myRecordId) // myRecordId is the record Id of the file to which you want to associate the upload
      .then((data) => {
        this.encryptedToken = data;
      })
      .catch((error) => {
        console.log("Error retrieving encrypted token");
      });
  }

  handleUploadFinished(event) {
    // Get the list of uploaded files
    const uploadedFiles = event.detail.files;
    alert("No. of files uploaded : " + uploadedFiles.length);
  }
}
