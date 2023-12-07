// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url: {
    userManagement: "/api/user-management",
    intimation: "/api/claims-intimation",
    claimRegistration:"/api/claims-registration",
    claimRegistrationDoc:"/claims-registration",
    claimTirdPartyCall : "/api/claims-third-party-calls",
    documentUpload:"/api/claims-document-service",
    claimAssesment:"/api/kli-claims-assessment",
    claimApproval:"/api/claims-approval",
    claimPayout:"/api/claims-payout",
    claimLaOds:"/api/claims-la-ods",
    claimCommonWeb:"/api/kli-claims-common-web",
    claimReferral:"/api/kli-claims-referral",
    communication:"/api/kli-claims-communication"
  },
  oauthClientId: "fooClientId",
  oauthClientSecret: "secret"
  
};

