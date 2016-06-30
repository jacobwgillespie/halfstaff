import requireDir from 'require-dir';

try {
  requireDir('tasks');
} catch (err) {
  throw err;
}
