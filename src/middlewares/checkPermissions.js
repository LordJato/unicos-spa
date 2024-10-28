import can from '../helpers/can';

export default async function checkPermissions({ next, to, router }) {
  const requiredPermissions = to.meta.permissions;

  const canEnter = await can(requiredPermissions);

  return canEnter ? next() : router.push({ name: 'forgotPassword' });

}