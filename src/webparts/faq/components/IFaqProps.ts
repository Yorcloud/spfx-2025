import { SPHttpClient} from '@microsoft/sp-http'
import { SPFI } from "@pnp/sp";

export interface IFaqProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  listId: string;
  sp: SPFI;
  spHttpClient: SPHttpClient;
  siteUrl: string;
}
