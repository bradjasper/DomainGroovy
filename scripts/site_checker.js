const fs = require('fs');
const axios = require('axios');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

async function checkWebsite(url) {
    try {
        const response = await axios.get(url, {
            timeout: 10000, // 10 seconds timeout
            validateStatus: function (status) {
                return status < 400; // Consider only 2xx and 3xx as success
            },
        });

        // Check for significant content
        if (response.data.length < 100) {
            return 'Extremely low content (possibly down)';
        }

        return null; // No significant issues
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            return 'Timeout - site may be down or very slow';
        }
        return `Error: ${error.message}`;
    }
}

async function main() {
    const failedSites = [];

    for (const website of data.websites) {
        const issue = await checkWebsite(website.url);
        if (issue) {
            failedSites.push({ name: website.name, url: website.url, issue });
        }
    }

    if (failedSites.length > 0) {
        console.log('Sites with major issues:');
        failedSites.forEach(site => {
            console.log(`- ${site.name} (${site.url}): ${site.issue}`);
        });
    } else {
        console.log('No major issues found with any sites.');
    }
}

main();
