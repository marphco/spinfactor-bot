const TOKEN = '932ss2as31d895130dd81f157b713e99d2dbadr';
const URL = 'https://fetch-main-ycuobe.laravel.cloud/api/document-qa';

const URL_SLASH = URL + '/';

async function testAPI() {
  try {
    console.log('--- Test 3: Bearer + Accept: application/json ---');
    let response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({ question: 'Chi è Spin Factor?', stream: false })
    });
    console.log('Status (Bearer + Accept):', response.status);

    if (response.status === 401) {
      console.log('--- Test 4: URL with trailing slash ---');
      response = await fetch(URL_SLASH, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({ question: 'Chi è Spin Factor?', stream: false })
      });
      console.log('Status (Trailing Slash):', response.status);
    }

    const data = await response.json();
    console.log('Last Response Data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Test Failed:', error.message);
  }
}

testAPI();
