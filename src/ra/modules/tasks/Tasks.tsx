import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

const Tasks = ({resource, list, edit, create, show, path, ...rest }) => {
  const { computedMatch, ...options } = rest;

  const listTask = list ?
    (<Route
      exact
      path={path}
      render={(routeProps) => {
        const { staticContext, ...routeOpts } = routeProps;
        return React.createElement(list, {
          basePath: path || routeProps.match.url,
          resource,
          hasCreate: !!create,
          hasList: !!list,
          hasEdit: !!edit,
          hasShow: !!show,
          ...routeOpts,
          ...options,
        });
      }}
    />)
    : null;

  const createTask = create ?
    (<Route
      path={`${path}/create`}
      render={(routeProps) => {
        const { staticContext, ...routeOpts } = routeProps;
        return React.createElement(create, {
          basePath: path || routeProps.match.url,
          resource,
          hasList: !!list,
          hasShow: !!show,
          record: {},
          ...routeOpts,
          ...options,
        });
      }}
    />)
    : null;

  const editTask = edit ?
    (<Route
      exact
      path={`${path}/:id`}
      render={(routeProps) => {
        const { staticContext, ...routeOpts } = routeProps;
        return React.createElement(edit, {
          basePath: path || routeProps.match.url,
          resource,
          hasCreate: !!create,
          hasList: !!list,
          hasEdit: !!edit,
          hasShow: !!show,
          id: routeProps.match.params.id,
          ...routeOpts,
          ...options,
        });
      }}
    />)
    : null;

  const showTask = show ?
    (<Route
      exact
      path={`${path}/:id/show`}
      render={(routeProps) => {
        const { staticContext, ...routeOpts } = routeProps;
        return React.createElement(show, {
          basePath: path || routeProps.match.url,
          resource,
          hasCreate: !!create,
          hasList: !!list,
          hasEdit: !!edit,
          hasShow: !!show,
          id: routeProps.match.params.id,
          ...routeOpts,
          ...options,
        });
      }}
    />)
    : null;

  return (
    <Switch>
      {createTask}
      {showTask}
      {editTask}
      {listTask}
    </Switch>
  );
};

Tasks.propTypes = {
  resource: PropTypes.string.isRequired,
  path: PropTypes.string,
  list: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  create: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  edit: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  show: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

};

export default Tasks;

