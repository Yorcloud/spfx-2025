import * as React from 'react';
import styles from './Faq.module.scss';
import type { IFaqProps } from './IFaqProps';
import { useEffect, useState } from 'react';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';

type ListItem = {
  Id: number,
  Title: string,
  Body: string
}
const Faq = (props: IFaqProps) => {

  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    hasTeamsContext,
    listTitle,
    siteUrl,
    spHttpClient } = props

  useEffect(() => {
    let isMounted = true; // guard against unmount

    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const safeTitle = encodeURIComponent(listTitle || ''); // allow empty -> will 404
        const url =
          `${siteUrl}/_api/web/lists/getbytitle('${safeTitle}')/items?$select=Id,Title,Body&$top=50`;

        const res: SPHttpClientResponse = await spHttpClient.get(url, SPHttpClient.configurations.v1);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

        const data = await res.json();
        if (isMounted) setItems(data.value as ListItem[]);
      } catch (e: any) {
        if (isMounted) setError(e.message || 'Unknown error');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (listTitle && listTitle.trim().length > 0) {
      fetchItems();
    } else {
      setItems([]);
      setLoading(false);
    }

    return () => { isMounted = false; };

  }, [spHttpClient, siteUrl, listTitle])

  return (
    <section className={`${styles.faq} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <h2>FAQ</h2>
        {!listTitle && <div>Set a <strong>List title</strong> in the property pane.</div>}
        {loading && <div>Loading…</div>}
        {error && <div role="alert">Error: {error}</div>}
        {!loading && !error && items.length > 0 && (
          <ul>
            {items.map(i => <li key={i.Id}>{i.Title ?? <em>(no title)</em>} - {i.Body}</li>)}
          </ul>
        )}
        {!loading && !error && listTitle && items.length === 0 && (
          <div>No items found.</div>
        )}
      </div>

    </section>
  );
}



export default Faq

// export default class Faq extends React.Component<IFaqProps> {
//   public render(): React.ReactElement<IFaqProps> {
//     const {
//       description,
//       isDarkTheme,
//       environmentMessage,
//       hasTeamsContext,
//       userDisplayName
//     } = this.props;

//     return (
//       <section className={`${styles.faq} ${hasTeamsContext ? styles.teams : ''}`}>
//         <div className={styles.welcome}>
//           <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
//           <h2>Well done, {escape(userDisplayName)}!</h2>
//           <div>{environmentMessage}</div>
//           <div>Web part property value: <strong>{escape(description)}</strong></div>
//         </div>
//         <div>
//           <h3>Welcome to SharePoint Framework!</h3>
//           <p>
//             The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
//           </p>
//           <h4>Learn more about SPFx development:</h4>
//           <ul className={styles.links}>
//             <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
//             <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
//           </ul>
//         </div>
//       </section>
//     );
//   }
// }
