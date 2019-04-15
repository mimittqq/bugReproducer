import { observeXml } from '../src/observeXml';

describe('', () => {
  test('在请求中插入监控', () => {
    let result_url = ''
    let result_method = ''
    let result_params = ''

    observeXml({
      onOpen: (m, u) => {
        result_method = m;
        result_url = u;
      },
      onAbort: () => {
      },
      onSend: (body) => {
        result_params = body as string;
      },
      onResponse: () => {
      }
    });
    const xml = new XMLHttpRequest();
    const url = 'www.baidu.com';
    const params = '?wd=haha';
    const method = 'GET';
    xml.open(method, url);
    xml.send(params);

    expect(result_url).toBe(url);
    expect(result_method).toBe(method);
    expect(result_params).toBe(params);
  })
})