import { observeClickEvent } from '../src/observeClickEvent';

describe('', () => {
  test('监控点击事件', () => {
    let is_trigger = false;
    observeClickEvent(() => {
      is_trigger = true;
    });
    const btn = document.createElement('div');
    document.body.append(btn);
    btn.click();
    
    expect(is_trigger).toBe(true);
  })
})