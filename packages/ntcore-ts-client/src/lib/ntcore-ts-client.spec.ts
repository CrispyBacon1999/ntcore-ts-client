import { NetworkTables } from './ntcore-ts-client';
import { NetworkTablesTypeInfos } from './types/types';

describe('NetworkTables', () => {
  let networkTables: NetworkTables;

  beforeEach(() => {
    networkTables = NetworkTables.getInstanceByTeam(973);
  });

  it('gets the client', () => {
    expect(networkTables.client).toBe(NetworkTables.getInstanceByTeam(973).client);
    const anotherClient = NetworkTables.getInstanceByTeam(9973).client;
    expect(anotherClient).not.toBe(networkTables.client);
  });

  it('creates a new NetworkTables instance with the correct port number', () => {
    expect(networkTables.getPort()).toBe(5810);
  });

  it('creates a new NetworkTables instance with the correct robot address', () => {
    expect(networkTables.getURI()).toBe('roborio-973-frc.local');
  });

  it('lets you change the URI', () => {
    networkTables.changeURI('roborio-9973-frc.local');
    expect(networkTables.getURI()).toBe('roborio-9973-frc.local');
  });

  it('returns the correct value for isRobotConnected', () => {
    expect(networkTables.isRobotConnected()).toBe(false);
  });

  it('returns the correct value for isRobotConnecting', () => {
    expect(networkTables.isRobotConnecting()).toBe(true);
  });

  it('allows adding and removing robot connection listeners', () => {
    const spy = jest.fn();
    const removeListener = networkTables.addRobotConnectionListener(spy, true);
    expect(spy).toHaveBeenCalledWith(false);
    removeListener();
  });

  it('creates a topic', () => {
    const topic = networkTables.createTopic<number>('/foo', NetworkTablesTypeInfos.kDouble, 1.0);
    expect(topic).toBeDefined();
  });
});
