import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Trees, Users, CalendarCheck, Landmark, LogOut, Leaf } from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  const adminLinks = [
    { to: '/',         icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/sites',    icon: Trees,           label: 'Sites'     },
    { to: '/managers', icon: Users,           label: 'Managers'  },
  ];

  const managerLinks = [
    { to: '/',             icon: LayoutDashboard, label: 'Dashboard'   },
    { to: '/attendance',   icon: CalendarCheck,   label: 'Attendance'  },
    { to: '/transactions', icon: Landmark,        label: 'Transactions'},
  ];

  const links = user.role === 'admin' ? adminLinks : managerLinks;
  const isActive = (path) => location.pathname === path;

  // Split links around centre logo
  const mid = Math.ceil(links.length / 2);
  const leftLinks  = links.slice(0, mid);
  const rightLinks = links.slice(mid);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --sb-bg: #0d1117;
          --sb-surface: #161b22;
          --sb-border: #21262d;
          --accent: #3fb950;
          --accent-dim: rgba(63,185,80,0.13);
          --accent-glow: rgba(63,185,80,0.28);
          --txt: #e6edf3;
          --txt-muted: #7d8590;
          --danger: #f85149;
          --danger-dim: rgba(248,81,73,0.12);
          --ease: 200ms cubic-bezier(0.4,0,0.2,1);
        }
        .g-sidebar *, .g-bottom-nav * { box-sizing: border-box; }

        /* ═══════════════════════════
           DESKTOP SIDEBAR
        ═══════════════════════════ */
        .g-sidebar {
          position: fixed;
          inset: 0 auto 0 0;
          width: 240px;
          background: var(--sb-bg);
          border-right: 1px solid var(--sb-border);
          display: flex;
          flex-direction: column;
          z-index: 200;
        }

        .g-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 26px 20px 18px;
          border-bottom: 1px solid var(--sb-border);
        }
        .g-brand-icon {
          width: 36px; height: 36px;
          background: var(--accent-dim);
          border: 1px solid var(--accent-glow);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
        }
        .g-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 800;
          letter-spacing: -0.5px;
          color: var(--txt);
        }
        .g-brand-name em { color: var(--accent); font-style: normal; }

        .g-nav {
          flex: 1;
          padding: 14px 10px;
          display: flex; flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }
        .g-nav-label {
          font-size: 10px; font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--txt-muted);
          padding: 6px 10px 8px;
          font-family: 'DM Sans', sans-serif;
        }
        .g-nav-link {
          display: flex; align-items: center; gap: 11px;
          padding: 9px 12px;
          border-radius: 8px;
          color: var(--txt-muted);
          text-decoration: none;
          font-size: 13.5px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          transition: background var(--ease), color var(--ease);
          position: relative;
          white-space: nowrap;
        }
        .g-nav-link:hover { background: var(--sb-surface); color: var(--txt); }
        .g-nav-link.active {
          background: var(--accent-dim);
          color: var(--accent);
          font-weight: 600;
        }
        .g-nav-link.active::before {
          content: '';
          position: absolute;
          left: 0; top: 7px; bottom: 7px;
          width: 3px;
          background: var(--accent);
          border-radius: 0 3px 3px 0;
        }

        /* User card + logout footer */
        .g-footer {
          border-top: 1px solid var(--sb-border);
          padding: 14px 10px 18px;
        }
        .g-user-card {
          display: flex; align-items: center; gap: 10px;
          background: var(--sb-surface);
          border: 1px solid var(--sb-border);
          border-radius: 10px;
          padding: 10px 12px;
          margin-bottom: 10px;
        }
        .g-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: var(--accent-dim);
          border: 1px solid var(--accent-glow);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 13px; font-weight: 700;
          color: var(--accent);
          flex-shrink: 0;
        }
        .g-user-info { overflow: hidden; }
        .g-user-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          color: var(--txt);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .g-user-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; color: var(--txt-muted);
          text-transform: capitalize;
        }
        .g-logout-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid var(--sb-border);
          background: transparent;
          color: var(--danger);
          font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background var(--ease), border-color var(--ease);
        }
        .g-logout-btn:hover {
          background: var(--danger-dim);
          border-color: var(--danger);
        }

        /* ═══════════════════════════
           BOTTOM NAV
        ═══════════════════════════ */
        .g-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          height: 68px;
          background: var(--sb-bg);
          border-top: 1px solid var(--sb-border);
          z-index: 200;
          padding: 0 4px;
        }
        .g-bottom-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .g-btm-link {
          display: flex; flex-direction: column;
          align-items: center; gap: 3px;
          padding: 6px 8px;
          border-radius: 10px;
          color: var(--txt-muted);
          text-decoration: none;
          font-size: 10px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          transition: color var(--ease), background var(--ease);
          flex: 1;
        }
        .g-btm-link:hover { color: var(--txt); }
        .g-btm-link.active {
          color: var(--accent);
          background: var(--accent-dim);
        }

        /* Centre logo — raised pill */
        .g-btm-logo {
          display: flex; flex-direction: column;
          align-items: center; gap: 3px;
          flex: 1;
        }
        .g-btm-logo-pill {
          width: 46px; height: 46px;
          background: var(--accent);
          border-radius: 15px;
          display: flex; align-items: center; justify-content: center;
          color: #0d1117;
          box-shadow: 0 0 0 3px var(--sb-bg), 0 0 0 4px var(--accent-glow), 0 6px 18px rgba(63,185,80,0.35);
          margin-top: -18px;
          transition: transform var(--ease), box-shadow var(--ease);
          cursor: default;
        }
        .g-btm-logo-pill:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 0 0 3px var(--sb-bg), 0 0 0 5px var(--accent-glow), 0 10px 24px rgba(63,185,80,0.4);
        }
        .g-btm-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 9px; font-weight: 800;
          letter-spacing: 0.6px;
          color: var(--accent);
        }

        .g-btm-logout {
          display: flex; flex-direction: column;
          align-items: center; gap: 3px;
          padding: 6px 8px;
          border: none; background: none;
          color: var(--danger);
          font-size: 10px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          border-radius: 10px;
          flex: 1;
          transition: background var(--ease);
        }
        .g-btm-logout:hover { background: var(--danger-dim); }

        /* ═══════════════════════════
           RESPONSIVE
        ═══════════════════════════ */
        @media (max-width: 1023px) {
          .g-sidebar     { display: none; }
          .g-bottom-nav  { display: flex; }
        }
        @media (max-width: 360px) {
          .g-btm-link, .g-btm-logout { font-size: 9px; padding: 6px 4px; }
          .g-btm-logo-pill { width: 40px; height: 40px; border-radius: 12px; }
        }
      `}</style>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="g-sidebar">
        <div className="g-brand">
          <div className="g-brand-icon"><Leaf size={18} /></div>
          <div className="g-brand-name">Gradin<em>a</em></div>
        </div>

        <nav className="g-nav">
          <div className="g-nav-label">Menu</div>
          {links.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className={`g-nav-link${isActive(to) ? ' active' : ''}`}>
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="g-footer">
          <div className="g-user-card">
            <div className="g-avatar">{(user.username?.[0] ?? 'U').toUpperCase()}</div>
            <div className="g-user-info">
              <div className="g-user-name">{user.username}</div>
              <div className="g-user-role">{user.role}</div>
            </div>
          </div>
          <button className="g-logout-btn" onClick={logout}>
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── BOTTOM NAV ── */}
      <div className="g-bottom-nav">
        <div className="g-bottom-inner">

          {leftLinks.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className={`g-btm-link${isActive(to) ? ' active' : ''}`}>
              <Icon size={20} />
              {label}
            </Link>
          ))}

          {/* Centre logo pill */}
          <div className="g-btm-logo">
            <div className="g-btm-logo-pill"><Leaf size={22} /></div>
            <span className="g-btm-logo-text">Gradina</span>
          </div>

          {rightLinks.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className={`g-btm-link${isActive(to) ? ' active' : ''}`}>
              <Icon size={20} />
              {label}
            </Link>
          ))}

          <button className="g-btm-logout" onClick={logout}>
            <LogOut size={20} />
            Logout
          </button>

        </div>
      </div>
    </>
  );
}