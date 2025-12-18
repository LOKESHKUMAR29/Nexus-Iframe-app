import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Globe2, 
  BookOpen, 
  Info,
  Building2,
  Zap,
  TrendingUp,
  History,
  Users
} from 'lucide-react';
import Sidebar from './Sidebar';
import IframeView from './IframeView';
import InfoPanel from './InfoPanel';
import '../App.css';

const PROXY_BASE_URL = 'https://express-highlighter.vercel.app/api/html-proxy?url=';

const SITES = [
  { 
    id: 'talent-ranking', 
    label: 'Talent Ranking', 
    icon: <BarChart3 size={20} />, 
    url: 'https://lightcast-heehtwdlx-lightcast.vercel.app/talent-attraction-scorecard-25-full-rankings?source=thought-leadership' 
  },
  { 
    id: 'stanford-ai-2025', 
    label: 'Stanford AI 2025', 
    icon: <Globe2 size={20} />, 
    url: 'https://lightcast-heehtwdlx-lightcast.vercel.app/resources/research/stanford-ai-index-2025?source=thought-leadership' 
  },
   { 
    id: 'global-ai-outlook', 
    label: 'Global AI Outlook', 
    icon: <BookOpen size={20} />, 
    url: 'https://lightcast-heehtwdlx-lightcast.vercel.app/resources/research/the-lightcast-global-ai-skills-outlook?source=thought-leadership' 
  },
  { 
    id: 'semiconductor-workforce', 
    label: 'Semiconductor Workforce', 
    icon: <Building2 size={20} />, 
    url: 'https://lightcast-heehtwdlx-lightcast.vercel.app/resources/research/rebuilding-our-semiconductor-workforce?source=thought-leadership' 
  },
  { 
    id: 'future-data-teams', 
    label: 'Future Data Teams', 
    icon: <Building2 size={20} />, 
    url: 'https://lightcast-heehtwdlx-lightcast.vercel.app/resources/research/future-data-teams-and-skills?source=thought-leadership' 
  },
  { 
    id: 'UNESCO', 
    label: 'UNESCO', 
    icon: <Building2 size={20} />, 
    url: 'https://lightcast-heehtwdlx-lightcast.vercel.app/resources/research/unesco-weight-of-words?source=thought-leadership' 
  },
  { 
    id: 'nga-progress', 
    label: 'NGA Progress', 
    icon: <Zap size={20} />, 
    url: 'https://lightcast-heehtwdlx-lightcast.vercel.app/resources/research/nga-empowering-progress-2025?source=thought-leadership' 
  },
   { 
    id: 'workforce-trends', 
    label: 'Workforce Trends', 
    icon: <Users size={20} />, 
    url: 'https://lightcast-heehtwdlx-lightcast.vercel.app/resources/research/allegis-workforce-trends?source=thought-leadership' 
  },
  { 
    id: 'stanford-ai-history', 
    label: 'AI Index Archive', 
    icon: <History size={20} />, 
    url: 'https://lightcast-heehtwdlx-lightcast.vercel.app/resources/research/stanford-ai-index?source=thought-leadership' 
  }
];

const Layout = () => {
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [currentSiteId, setCurrentSiteId] = useState(SITES[0].id);

  // Derived current URL
  const selectedSite = SITES.find(s => s.id === currentSiteId) || SITES[0];
  const currentUrl = `${PROXY_BASE_URL}${encodeURIComponent(selectedSite.url)}`;
  
  const toggleInfoPanel = () => {
    setIsInfoPanelOpen(!isInfoPanelOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSiteSelect = (site) => {
    setCurrentSiteId(site.id);
  };

  // Convert SITES to nav items format
  const navItems = SITES.map(site => ({
    label: site.label,
    icon: site.icon,
    active: site.id === currentSiteId,
    onClick: () => handleSiteSelect(site)
  }));


  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Security check: In production, verify event.origin here
      
      if (event.data && event.data.type === 'OPEN_INFO_PANEL') {
        setIsInfoPanelOpen(true);
        // Update state with the received data
        setSelectedInfo({
            word: event.data.word,
            details: event.data.data
        });
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup listener
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className={`app-layout ${isInfoPanelOpen ? 'panel-open' : ''} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar 
         menuItems={navItems} 
         isCollapsed={isSidebarCollapsed}
         toggleSidebar={toggleSidebar}
      />
      
      <IframeView url={currentUrl}>
         {/* Button to open Info Panel */}
        {!isInfoPanelOpen && (
          <button className="toggle-info-btn" onClick={toggleInfoPanel} aria-label="Open Info Panel">
             <Info size={18} />
             <span className="btn-label">Info</span>
          </button>
        )}
      </IframeView>

      <InfoPanel 
        isOpen={isInfoPanelOpen} 
        togglePanel={toggleInfoPanel} 
        data={selectedInfo}
      />
    </div>
  );
};

export default Layout;
