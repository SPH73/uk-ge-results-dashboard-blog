Milestone Project 2 - Code Institute Software Development Diploma

Interactive Front End Development

A century of Great Britain's Voting Bias

This aim of this project is to create a dashboard style blog with a visual representation of voting bias over the past century, using a presentation of known results, to see whether there was any noticeable correlation with historical events which may have played a role in swaying votes in a particular direction and how if at all it affected the distribution of seats in parliament. More specifically, I wanted to see whether any ordinary person who isn't an expert on the topic, would be able to distinguish any relational patterns when cognitive analysis was replaced by visual perception.

Table of Contents

<!-- TOC -->

    - [UX](#ux)
    - [Features](#features)
        - [Results Charts](#results-charts)
        - [Historical Results Charts](#historical-results-charts)
    - [Select Menu](#select-menu)
    - [Summary](#summary)
    - [About](#about)
    - [Final Comment](#final-comment)
    - [Sources](#sources)
    - [Improvements to implement](#improvements-to-implement)
- [Technologies Used](#technologies-used)
    - [Frameworks:](#frameworks)
    - [Toolkits](#toolkits)
    - [Libraries:](#libraries)
    - [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)
- [Media](#media)
- [Acknowledgements](#acknowledgements)
- [Inspiration](#inspiration)
- [Wireframes](#wireframes)

<!-- /TOC -->

### ..1. UX

My intention for the User Experience was to ensure that the site works on both mobile or desktop. Whilst a dashboard is more appropriate for a desktop sized screen, I focussed on balancing the size of the individual graphs such that they would be visible without being too small or too big on each media type. [dc.js has a method](https://dc-js.github.io/dc.js/docs/html/BaseMixin.html#useViewBoxResizing__anchor) that uses the `svg`element rather than chart width and height attributes, enabling the chart to resize responsively while maintaining the aspect ratio which helped to achieve this end.

User: 1 As a user interested in the election results, I want to be able to absorb the data visually than from a text format so that I can view the results more efficiently. I want to be able to interact with the data by filtering it to for analysis and comparison.

User: 2 As a user interested in the general history of the UK elections I want to be able to view a time-line of the results. In a graph I can gain a clearer perspective and be able to absorb more data at once.

For User 1, I have strategically placed a `Back To Top` button beneath the charts. It is possible that this type of user may not be interested in the blog texts. However, should they wish to peruse relevant data sources, once they are back at the top they can navigate via the Sources link in the <Nav>. All data sources and additional resources I used are found in the <footer> section where again, they will find a duplicate button to help them navigate back to the charts should they so desire.

Page refresh buttons are located in each chart section however, the `Select Menu` can also reset the chart by clicking on Select All.
For both types of user, I have tried to select graphs that would best represent the data type.

Icons and Tooltips in the <Footer> provide additional information that can be quickly scanned for relevance.

### ..2. Features

The main features of this project are the graphs. There are five graphs to illustrate the two different datasets covering the latest results and the historical results. The former being an addition that became relevant during development.

#### ..2.1. Results Charts

For the latest election results charts, there are 2 Pie Charts and a Bubble chart. The Pie Charts refer to the votes and seats results respectively and the Bubble Chart collates the data presented in each Pie Chart and provides a comparison. It was included to elaborate the “first past the post” voting system that the UK adopts essentially to see how disparate the votes to seats figures are.

#### ..2.2. Historical Results Charts

A Stacked Bar Chart and Composite Chart display the full results for past century of the votes and seats results respectively, for each party. The intention for these charts was to show how the individual party’s fared in respect of their competition in order to highlight periods of strength and/or weakness. I had particularly hope to see whether there was a pattern associated to historical events. N.B. These chart make it possible to do so and I am continuing research on this aspect of my inquiry and intend to document my conclusion at a later date.

### ..3. Select Menu

It was ideal to have a `Select Menu` for each chart section. For the 2019 election section I added in a range dimension to the dataset to make the `Select Menu` viable. I could already assume an irregularity in the Pie Charts as I had noted a similarity in the historical charts. I needed the `Select Menu` so that I could analyse the relationship (if any) between the number of seats won in comparison to the votes received. Prior to the seeing the charts for myself I had not known of the “first past the post voting system” and it was a lucky reveal. I received help in this aspect from a CI tutor who suggested that a range dimension would solve my problem as a simple party dimension wasn’t providing the selection I needed for my analysis.
The `Select Menu` for the historical charts are a simple isolation of other parties data. Although the data set spans a century, there are far fewer registered parties than during the 2019 election and this was taken into consideration when deciding upon how to present the data.

### ..4. Summary

The project is in the style of a blog dashboard (if such a thing exists), which I felt was most appropriate for creating a project that answers my own questions and details my thoughts. I found that my analysis was verbose and I greatly reduced my initial write up in order to condense the project more to its purpose and requirements, namely, presentation of interactive data.

### ..5. About

While this project was not a commercial in any manner, I included the about section so that any visitors were provided insight on the purpose and reason of the project and be able to identify with the author. Moreover, I had felt that an image was missing and so I decided to ask the question [Why include an author photo in a blog](https://www.shoutmeloud.com/4-ways-how-images-enhance-your-blog.html) and I was completely convinced that I should include one after seeing the results of my search.

### ..6. Final Comment

This is hidden on mobile in order not to take up further real estate. To be frank, I couldn’t help myself; it was my reaction to being exposed to the latest results. It probably doesn’t add value but as it’s my project, and probably mostly for my benefir, I decided to humour myself.

### ..7. Sources

Naturally it was necessary to inlcude links to the original Data Sources and then other links under Additional Resources that I had read and found interesting throughout my inquiry.

### ..8. Improvements to implement

I have been bothered that the colours for each party are not consistent. This is something I plan on addressing in the immediate future. The only reason I didn’t address it before submission is because I didn’t want to use more time on something that is a styling aspect and irrelevant to the project purpose, although I admit it provides a better user experience and needs to be amended.

## .1. Technologies Used

### .1.1. Frameworks:

[Bootstrap4](https://getbootstrap.com/docs/4.4/getting-started/download/) for a responsive layout using
[Bootswatch](https://bootswatch.com/) for the page style theme.

### .1.2. Toolkits

[Font-Awesome5](https://fontawesome.com/icons?d=gallery) for the footer icons.

### .1.3. Libraries:

[D3.js](https://d3js.org/) for the data visualisation using DOM manipulation. D3.js is a JavaScript library for manipulating documents based on data.
crossfilter.js(https://square.github.io/crossfilter/) for multidemsional data filtering. Crossfilter is a JavaScript library for exploring large multivariate datasets in the browser.
[DC.js](https://dc-js.github.io/dc.js/docs/html/index.html) for creating the interactive dashboard. dc.js is a javascript charting library with native crossfilter support, allowing highly efficient exploration on large multi-dimensional datasets (inspired by crossfilter's demo). It leverages d3 to render charts in CSS-friendly SVG format. Charts rendered using dc.js are data driven and reactive and therefore provide instant feedback to user interaction.
[JavaScript] for dynamic functionality. JavaScript is the programming language of the web used to make web pages interactive.
[Git] for version control. Git is a VCS that allows you to revert selected files back to a previous state, revert the entire project back to a previous state, compare changes over time etc.
[GitHub] for remote version control and remote repository store for the project. It is a coding social site that allows you to upload code repositories for storage in the Git Version Control System.
[GitHub pages] for deployment. It allows you to turn repositories into web pages.
Favicon Generator to create the favicons.
In order to create the favicon image with suitable correct aspect ratio, I merged two images together using this free online tool by IMGonline.com.ua

### .1.4. Testing

I have found [Test Cafe Studio](https://www.devexpress.com/products/testcafestudio/) however, at present I am not comfortable with writing automated tests and decided it was prudent to chose manual testing for now and attempt automated testing when the clock isn’t ticking. In order to ensure my project is production ready I have manually tested it on the following browsers: Chrome, Safari, Firefox, IE, Opera and Opera Mini.

I was most particularly focussed on viewing the charts on each of the bowsers both on a mobile phone, tablet as well as a desktop.

I have Apple devices and additionally a Windows 10 PC, so I enlisted help to test the functionality of the site on other devices to ensure that the page loaded quickly and the charts could be viewed.

The actions taken were: Load the GitHub pages site and view the charts. Click on the charts and see that the response was as expected; use the `Select Menu` to reduce the chart data and ensure the charts matched the selection; click on all the links and ensure that they open in a new browser tab that corresponded with the link text or and advise via Tooltip what the link is.

_While testing I noticed that my Pie Charts `Select Menu` didn’t provide the results that I had envisioned. With the help of tutor support I was able to solve the issue by creating an additional range dimension that accurately provided the isolation of data that I needed for my analysis._

All the chart functionality worked as intended across the devices and browsers after the new range dimension was built. The navigation links and buttons were functioning properly.

_During testing of the page links I noted that the `target=_blank` attribute wasn’t included when the links redirected me away from my site so this was added along with the `rel=“noopener”`to prevent abuse of`winder.opener``` and that a tooltip would improve the user experience so these were added._

I used [W3C Markup Validation Service](https://validator.w3.org/) to check my HTML and CSS code and was pleased that there were no errors aside from a missing div tag in the HTML.

I used [Beautify Tools](http://beautifytools.com/javascript-validator.php) to check my javascript code. It highlighted some missing semicolons and that I was using the let variable keyword.

## .2. Deployment

The project is deployed on GitHub pages from the master branch and will update automatically upon new commits so the deployed version and the development version are currently identical. (The project will be forked before any additional work is commenced.)In order to achieve this, I used the settings menu and navigated to the GitHub Pages section and selected the master branch as the source. The project can be viewed from [here](https://sph73.github.io/uk-ge-results-blog-dashboard/).

## .3. Credits

For many aspects of the chart development I used the following tutorials, however, I did not copy any code from the sites. I used them in conjunction with the library documentation piecing the parts together to make a whole:
[CI Data Visualisations lessons](https://courses.codeinstitute.net/courses/course-v1:CI+FS_OC+T4_2019/courseware/671d5fab237d4a52a7886c9a2f1437e5/90f5690a3a8d4d2586e1af7111c80b5f/?activate_block_id=block-v1%3ACI%2BFS_OC%2BT4_2019%2Btype%40sequential%2Bblock%4090f5690a3a8d4d2586e1af7111c80b5f),
[Tutorialspoint dc.js](https://www.tutorialspoint.com/dcjs/index.htm),
[A gentle introduction to d3](https://www.freecodecamp.org/news/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46/)

## .4. Media

The free images used to generate the favicon was obtained from [here](https://duckduckgo.com/?q=free+images+for+britain&atb=v187-1&iar=images&iax=images&ia=images).

## .5. Acknowledgements

Additionally, thanks goes to Brian Macharia, my awesome mentor, for suggesting that the select menu items were not very intuitive and proposing that they could be changed to provide a better user experience.

Also to CI tutor Stephen, for the idea to build an additional dimension for the range selection in order for me to properly use the 2019 charts for the analysis that I had originally intended. Due to the nature of my data not really being suitable for the `Select Menu` this was a wonderful workaround.

## .6. Inspiration

Having just returned to England after a long period abroad, I found myself somewhat out of the loop with regards to politics, which was particularly emphasised by the upcoming election on December 12th, 2019. I spent rather a lot of time trying to improve my understanding and knowledge in order to feel like I would make an informed vote, without really succeeding as much as I had hoped. I chose to use the topic for my project in an attempt to answer my own questions and possibly provide a more vsual understanding of where GB stood in respect of the political parties based on the past 100 years. I felt this could potentially provide a platform for further questions to arise and construct a means to answer them.

## .7. Wireframes

The original wireframes are located here.
