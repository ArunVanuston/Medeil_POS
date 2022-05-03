export const environment = {
  production: true,
  backend: {

     baseURL: "https://secure.medeil.io/auth/oauth",
    paymentUrl: "https://secure.medeil.io/medeilpospay/payment",
    baseResUrl: "https://secure.medeil.io/medeilposboot/api",

    // baseURL: "http://143.110.179.9:7777/testauth/oauth",
    // paymentUrl: "http://143.110.179.9:7779/testpay/payment",
    // baseResUrl: "http://143.110.179.9:7778/testboot/api",
    thirdpartyUrl:"http://167.71.226.119:8989/third-party-api/api/v1",
    //baseResUrl:"http://localhost:8085/api",
    // baseURL:"http://localhost:8086/oauth",
    // paymentUrl:"http://localhost:8082/payment",root
    // baseURL: "http://159.89.170.189:8087/testauth/oauth",
    // paymentUrl: "http://159.89.170.189:8089/testpay/payment",
    // baseResUrl: "http://159.89.170.189:8088/testboot/api",
  },
  medauthbackend: {

 baseResUrl2: "https://secure.medeil.io/medeilposboot/medauth"
      // baseResUrl2: "http://143.110.179.9:7778/testboot/medauth"
      //baseResUrl2:"http://localhost:8085/medauth",
      //baseResUrl2: "http://159.89.170.189:8088/testboot/medauth"
  }
};
