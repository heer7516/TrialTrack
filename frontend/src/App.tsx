
import { useState } from "react";
import "./App.css";

type Site = {
  id: number;
  name: string;
  location: string;
  study: string;
  status: string;
  progress: number;
};

const initialSites: Site[] = [
  {
    id: 1,
    name: "Toronto Research Centre",
    location: "Toronto, Canada",
    study: "ST-2026-001",
    status: "Active",
    progress: 85,
  },
  {
    id: 2,
    name: "Ottawa Clinical Institute",
    location: "Ottawa, Canada",
    study: "ST-2026-002",
    status: "Pending",
    progress: 60,
  },
  {
    id: 3,
    name: "Vancouver Medical Centre",
    location: "Vancouver, Canada",
    study: "ST-2026-003",
    status: "Active",
    progress: 92,
  },
  {
    id: 4,
    name: "Kingston Health Research",
    location: "Kingston, Canada",
    study: "ST-2026-004",
    status: "Review",
    progress: 45,
  },
];

const activities = [
  {
    title: "Document submitted",
    detail: "Toronto Research Centre · Protocol v2",
    time: "10 minutes ago",
  },
  {
    title: "Issue reported",
    detail: "Ottawa Clinical Institute · Missing data",
    time: "1 hour ago",
  },
  {
    title: "Study site updated",
    detail: "Vancouver Medical Centre · Site information",
    time: "3 hours ago",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [sites, setSites] = useState<Site[]>(initialSites);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    study: "",
    status: "Active",
    progress: 0,
  });

  const navigation = [
    { name: "Dashboard", icon: "▦" },
    { name: "Research Sites", icon: "⌂" },
    { name: "Documents", icon: "▤" },
    { name: "Issues", icon: "⚑" },
    { name: "Tasks", icon: "✓" },
  ];

  const filteredSites = sites.filter((site) =>
    `${site.name} ${site.location} ${site.study}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function openAddForm() {
    setEditingId(null);

    setFormData({
      name: "",
      location: "",
      study: "",
      status: "Active",
      progress: 0,
    });

    setShowForm(true);
  }

  function openEditForm(site: Site) {
    setEditingId(site.id);

    setFormData({
      name: site.name,
      location: site.location,
      study: site.study,
      status: site.status,
      progress: site.progress,
    });

    setShowForm(true);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editingId !== null) {
      setSites((previousSites) =>
        previousSites.map((site) =>
          site.id === editingId
            ? { ...site, ...formData }
            : site
        )
      );
    } else {
      const newSite: Site = {
        id: Date.now(),
        ...formData,
      };

      setSites((previousSites) => [...previousSites, newSite]);
    }

    setShowForm(false);
    setEditingId(null);
  }

  function deleteSite(id: number) {
    setSites((previousSites) =>
      previousSites.filter((site) => site.id !== id)
    );
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: name === "progress" ? Number(value) : value,
    }));
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">T</div>

          <div>
            <h2>TrialTrack</h2>
            <span>Clinical Management</span>
          </div>
        </div>

        <p className="menu-label">WORKSPACE</p>

        <nav>
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="user-avatar">HR</div>

          <div>
            <strong>Project Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Workspace / </span>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-right">
            <span className="notification">●</span>
            <div className="top-avatar">HR</div>
          </div>
        </header>

        <section className="page-content">
          <div className="welcome">
            <div>
              <p className="date-label">CLINICAL OPERATIONS</p>

              <h1>{activePage}</h1>

              <p className="subtitle">
                Monitor clinical research activities and study progress.
              </p>
            </div>

            {activePage === "Dashboard" && (
              <button
                className="primary-button"
                onClick={() => setActivePage("Research Sites")}
              >
                + View research sites
              </button>
            )}

            {activePage === "Research Sites" && (
              <button
                className="primary-button"
                onClick={openAddForm}
              >
                + Add Research Site
              </button>
            )}
          </div>

          {activePage === "Dashboard" && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-heading">
                    <span>Total Studies</span>
                    <span className="stat-icon purple">▦</span>
                  </div>

                  <h2>12</h2>
                  <p>Clinical studies registered</p>
                </div>

                <div className="stat-card">
                  <div className="stat-heading">
                    <span>Research Sites</span>
                    <span className="stat-icon blue">⌂</span>
                  </div>

                  <h2>{sites.length}</h2>
                  <p>Registered research sites</p>
                </div>

                <div className="stat-card">
                  <div className="stat-heading">
                    <span>Pending Documents</span>
                    <span className="stat-icon orange">▤</span>
                  </div>

                  <h2>08</h2>
                  <p>Require document review</p>
                </div>

                <div className="stat-card">
                  <div className="stat-heading">
                    <span>Open Issues</span>
                    <span className="stat-icon red">⚑</span>
                  </div>

                  <h2>05</h2>
                  <p>Need attention</p>
                </div>
              </div>

              <div className="content-grid">
                <section className="panel sites-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Research Sites</h3>
                      <p>
                        Overview of registered research locations
                      </p>
                    </div>

                    <button
                      className="text-button"
                      onClick={() => setActivePage("Research Sites")}
                    >
                      View all →
                    </button>
                  </div>

                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search research sites..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                  />

                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Site name</th>
                          <th>Study ID</th>
                          <th>Status</th>
                          <th>Progress</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredSites.map((site) => (
                          <tr key={site.id}>
                            <td>
                              <strong>{site.name}</strong>
                              <span className="location">
                                {site.location}
                              </span>
                            </td>

                            <td>{site.study}</td>

                            <td>
                              <span
                                className={`status ${site.status.toLowerCase()}`}
                              >
                                {site.status}
                              </span>
                            </td>

                            <td>
                              <div className="progress-cell">
                                <div className="progress-track">
                                  <div
                                    className="progress-fill"
                                    style={{
                                      width: `${site.progress}%`,
                                    }}
                                  />
                                </div>

                                <span>{site.progress}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}

                        {filteredSites.length === 0 && (
                          <tr>
                            <td colSpan={4}>
                              No research sites found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="panel activity-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Recent Activity</h3>
                      <p>Latest workspace updates</p>
                    </div>
                  </div>

                  <div className="activity-list">
                    {activities.map((activity, index) => (
                      <div className="activity-item" key={index}>
                        <div className="activity-dot" />

                        <div>
                          <strong>{activity.title}</strong>
                          <p>{activity.detail}</p>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}

          {activePage === "Research Sites" && (
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Research Site Management</h3>
                  <p>
                    Add, update, search and manage research locations.
                  </p>
                </div>
              </div>

              <input
                className="search-input"
                type="text"
                placeholder="Search by site name, location or study ID..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Site name</th>
                      <th>Location</th>
                      <th>Study ID</th>
                      <th>Status</th>
                      <th>Progress</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSites.map((site) => (
                      <tr key={site.id}>
                        <td>
                          <strong>{site.name}</strong>
                        </td>

                        <td>{site.location}</td>

                        <td>{site.study}</td>

                        <td>
                          <span
                            className={`status ${site.status.toLowerCase()}`}
                          >
                            {site.status}
                          </span>
                        </td>

                        <td>
                          <div className="progress-cell">
                            <div className="progress-track">
                              <div
                                className="progress-fill"
                                style={{
                                  width: `${site.progress}%`,
                                }}
                              />
                            </div>

                            <span>{site.progress}%</span>
                          </div>
                        </td>

                        <td>
                          <div className="site-actions">
                            <button
                              className="edit-button"
                              onClick={() => openEditForm(site)}
                            >
                              Edit
                            </button>

                            <button
                              className="delete-button"
                              onClick={() => deleteSite(site.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredSites.length === 0 && (
                      <tr>
                        <td colSpan={6}>
                          No research sites found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="site-count">
                Showing {filteredSites.length} of {sites.length} research sites
              </p>
            </section>
          )}

          {activePage !== "Dashboard" &&
            activePage !== "Research Sites" && (
              <section className="panel placeholder-panel">
                <div className="placeholder-icon">▦</div>

                <h3>{activePage}</h3>

                <p>
                  This module is planned for the next development stage.
                  Return to Dashboard to view the current overview.
                </p>

                <button
                  className="primary-button"
                  onClick={() => setActivePage("Dashboard")}
                >
                  Back to Dashboard
                </button>
              </section>
            )}

          {showForm && (
            <div className="modal-overlay">
              <div className="site-form">
                <div className="panel-heading">
                  <div>
                    <h3>
                      {editingId !== null
                        ? "Edit Research Site"
                        : "Add Research Site"}
                    </h3>

                    <p>
                      Enter the research site information below.
                    </p>
                  </div>

                  <button
                    className="close-button"
                    onClick={() => setShowForm(false)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleFormSubmit}>
                  <div className="form-field">
                    <label htmlFor="name">Site Name</label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter site name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="location">Location</label>

                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Enter city and country"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="study">Study ID</label>

                    <input
                      id="study"
                      name="study"
                      type="text"
                      placeholder="Example: ST-2026-005"
                      value={formData.study}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="status">Status</label>

                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Review">Review</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="progress">
                      Progress: {formData.progress}%
                    </label>

                    <input
                      id="progress"
                      name="progress"
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-buttons">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="primary-button"
                    >
                      {editingId !== null
                        ? "Save Changes"
                        : "Add Site"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <footer>
            TrialTrack © 2026 · Clinical Research Management Prototype
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
