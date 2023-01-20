import Listr = require("listr");
import { ArgumentsHelper } from "../helpers/ArgumentsHelper";
import { execScript } from "../helpers/execScript";
import { CommandArguments } from "../models/CommandArguments";


export class Authenticate {

  /**
   * Authentication task - Splitted for output log of the device code
   * @param auth 
   */
  public static async init(options: CommandArguments) {
    const { auth, username, password, tenant, appId, certificateBase64Encoded, secret } = options;

    await new Listr([
      {
        title: `Authenticate to M365 with ${auth}`,
        task: async () => {
          if (auth === "deviceCode") {
            await execScript([`login`], false, true);
          } else if (auth === "certificate") {
            await execScript(ArgumentsHelper.parse(`login --authType certificate --appId "${appId}" --tenant "${tenant}" --certificateBase64Encoded "${certificateBase64Encoded}" ${password ? `--password ${password}` : `--password`}`), false, false, [certificateBase64Encoded, password]);
          } else if (auth === "secret") {
            await execScript(ArgumentsHelper.parse(`login --authType secret --secret "${secret}" ${tenant ? `--tenant "${tenant}"` : ``}  ${appId ? `--appId "${appId}"` : ``}`), false, false, [secret]);
          } else {
            await execScript(ArgumentsHelper.parse(`login --authType password --userName "${username}" --password "${password}" ${tenant ? `--tenant "${tenant}"` : ``}  ${appId ? `--appId "${appId}"` : ``}`), false, false, [password]);
          }
        }
      }
    ]).run();
  }
}