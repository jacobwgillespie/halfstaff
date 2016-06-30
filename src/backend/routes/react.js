import renderReact from '../renderReact';

export default (req, res) => {
  renderReact(req, (code, location, content) => {
    if (location) return res.redirect(code, location);

    if (code) res.status(code).send(content);
    else res.send(content);

    return null;
  });
};
