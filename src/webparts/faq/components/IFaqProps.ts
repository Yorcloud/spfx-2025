import { SPHttpClient} from '@microsoft/sp-http'

export interface IFaqProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  listTitle: string;

  spHttpClient: SPHttpClient;
  siteUrl: string;
}
