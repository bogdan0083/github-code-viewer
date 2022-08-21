import { FileFieldsFragment } from "../../../generated/graphql";
import { faker } from "@faker-js/faker";

const genericBlob: FileFieldsFragment = {
  __typename: "Blob",
  byteSize: faker.datatype.number(),
  oid: faker.datatype.uuid(),
  text: "declare const __DEV__: boolean\ndeclare const __TEST__: boolean\ndeclare const __GLOBAL__: boolean\n\ninterface Window {\n  __VUE_DEVTOOLS_GLOBAL_HOOK__: DevtoolsHook\n}\n\n// from https://github.com/vuejs/vue-devtools/blob/bc719c95a744614f5c3693460b64dc21dfa339a8/packages/app-backend-api/src/global-hook.ts#L3\ninterface DevtoolsHook {\n  emit: (event: string, ...payload: any[]) => void\n  on: (event: string, handler: Function) => void\n  once: (event: string, handler: Function) => void\n  off: (event?: string, handler?: Function) => void\n  Vue?: any\n  // apps: AppRecordOptions[]\n}\n",
};

export default genericBlob;
