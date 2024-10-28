import can from '../helpers/can';

export default async function checkPermissions({ next, to, router }) {
  const requiredPermissions = to.meta.permissions;

  if (can(requiredPermissions)) {
    return next();
  }

  return router.push({ name: 'home' });
};