const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const data = require('./data.json');
const template = fs.readFileSync('index.ejs', 'utf-8');

// Organize websites by category
const categoriesWithSites = data.categories.map(category => {
  return {
    ...category,
    sites: data.websites.filter(website => website.category === category.id)
  };
});

// Prepare data for the template
const renderData = {
  categories: categoriesWithSites
};

const html = ejs.render(template, renderData);

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('index.html generated successfully');