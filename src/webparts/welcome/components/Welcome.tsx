import * as React from 'react';
import styles from './Welcome.module.scss';
import type { IWelcomeProps } from './IWelcomeProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Welcome extends React.Component<IWelcomeProps> {


  public render(): React.ReactElement<IWelcomeProps> {
    const {
     
      hasTeamsContext,
      userDisplayName,
      morningMessage,
      afternoonMessage,
      eveningMessage
    } = this.props;

    const now = new Date();
    const hour = now.getHours();

    const message = hour < 12 ? morningMessage : hour >= 12 && hour < 18 ? afternoonMessage : eveningMessage

    return (
      <section className={`${styles.welcome} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <h2>{message}, {escape(userDisplayName)}!</h2>
         </div>
        
      </section>
    );
  }
}
