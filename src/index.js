import './index.scss';
import React from 'react';
import { render } from 'react-snapshot';
import { Router, browserHistory } from 'react-router';
import routes from './routeConfig/routes';
import GoogleAnalytics from 'react-ga';
import registerServiceWorker from './registerServiceWorker';

GoogleAnalytics.initialize('UA-66576358-3');

const logPageView = state => {
  const currentPath = window.location.pathname;
  // Manually push new page event to Google analytics
  GoogleAnalytics.set({ page: currentPath });
  GoogleAnalytics.pageview(currentPath);

  // Manually push new page event to HubSpot analytics
  const _hsq = (window._hsq = window._hsq || []);
  _hsq.push(['setPath', currentPath]);
  _hsq.push(['trackPageView']);
};

(function () {
  console.log('rendering');
  
  render(
    <Router history={browserHistory} onUpdate={logPageView}>
      {routes}
    </Router>,
    document.getElementById('root')
  );
})()

registerServiceWorker();
