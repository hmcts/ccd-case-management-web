const handleMVCache = (req, res, next) => {
  if (req.path === '/media-viewer') {
    res.set('cache-control', 'public, max-age=31536000');
    res.removeHeader('expires');
    res.removeHeader('pragma');
    res.removeHeader('surrogate-control');
  }
  next();
};

module.exports = handleMVCache;
