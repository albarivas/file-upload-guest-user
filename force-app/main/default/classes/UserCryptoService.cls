public with sharing class UserCryptoService {
  @AuraEnabled
  public static String doEncrypt(String recordId) {
    return ued.UserCryptoHelper.doEncrypt(
      recordId +
      '|' +
      System.today() +
      '|' +
      System.DateTime.now().getTime()
    );
  }
}
