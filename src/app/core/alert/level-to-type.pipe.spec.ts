import { LevelToTypePipe } from './level-to-type.pipe';

describe('LevelToTypePipe', () => {

  let levelToType: LevelToTypePipe;

  beforeEach(() => {
    levelToType = new LevelToTypePipe();
  });

  it('should convert level `error` to type `warning`', () => {
    expect(levelToType.transform('error')).toBe('error');
  });

  it('should convert level `success` to type `success`', () => {
    expect(levelToType.transform('success')).toBe('success');
  });

  it('should convert unknown level to type `warning`', () => {
    expect(levelToType.transform(null)).toBe('warning');
  });

  it('should convert level `message` to type `message`', () => {
    expect(levelToType.transform('message')).toBe('message');
  });
});
