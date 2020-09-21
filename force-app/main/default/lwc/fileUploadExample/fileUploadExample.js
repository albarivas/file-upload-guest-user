import { LightningElement, api } from "lwc";
import doEncrypt from "@salesforce/apex/UserCryptoService.doEncrypt";

export default class FileUploadExample extends LightningElement {
  @api
  myRecordId;
  encryptedToken;

  get acceptedFormats() {
    return [".pdf", ".png"];
  }

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
