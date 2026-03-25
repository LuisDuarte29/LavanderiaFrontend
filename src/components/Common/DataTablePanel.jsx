import PropTypes from "prop-types";
import "./DataTablePanel.css";

function DataTablePanel({ title, subtitle, action, children }) {
  return (
    <section className="dashboard-table-panel">
      <div className="dashboard-table-panel__header">
        <div>
          <span className="dashboard-table-panel__eyebrow">Vista operativa</span>
          <h2 className="dashboard-table-panel__title">{title}</h2>
          {subtitle ? (
            <p className="dashboard-table-panel__subtitle">{subtitle}</p>
          ) : null}
        </div>

        {action ? (
          <div className="dashboard-table-panel__action">{action}</div>
        ) : null}
      </div>

      <div className="dashboard-table-panel__body">{children}</div>
    </section>
  );
}

DataTablePanel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  action: PropTypes.node,
  children: PropTypes.node.isRequired,
};

DataTablePanel.defaultProps = {
  subtitle: "",
  action: null,
};

export default DataTablePanel;
