import type { SearchResultRecord } from 'types/index'

export const testApplicationResult: SearchResultRecord = {
  id: 'testBookmark123',
  type: 'Bookmark',
  title: 'MyFSS',
  preview:
    'How is Air Force Information Management System abbreviated? AFIMS stands for Air Force Information Management System. For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective.',
  permalink: 'https://www.url.com/myfss',
}

export const testDocumentationResult: SearchResultRecord = {
  id: 'testDocumentation123',
  type: 'Documentation',
  title: 'Some Documentation',
  preview:
    'Documentation posted about some important topic that you should read about.',
  permalink: 'https://localhost:3000/path/to/documentation',
}

export const testLandingPageResult: SearchResultRecord = {
  id: 'testLandingPage123',
  type: 'LandingPage',
  title: 'Some Landing Page',
  preview:
    'Our team landing page where you can find all the information you need to know about our team.',
  permalink: 'https://localhost:3000/landing/team',
}

export const testArticleResultNoLabels: SearchResultRecord = {
  id: 'testArticle124',
  type: 'Article',
  title:
    'Physical training: but without labels Everything you need to know about the update in requirements',
  preview:
    'There are no labels. As a steward of almost 9 million acres encompassing forests, prairies, deserts, wetlands, and coastal habitats, the Department of the Air Force recognizes the importance of protecting and sustaining the natural environment.',
  permalink:
    'https://localhost:3000/articles/physical-training-everything-you-need-to-know-no-labels',
  date: '2022-05-17T13:44:39.796Z',
}
export const testArticleResult: SearchResultRecord = {
  id: 'testArticle123',
  type: 'Article',
  title:
    'Physical training: Everything you need to know about the update in requirements',
  preview:
    'As a steward of almost 9 million acres encompassing forests, prairies, deserts, wetlands, and coastal habitats, the Department of the Air Force recognizes the importance of protecting and sustaining the natural environment.',
  permalink:
    'https://localhost:3000/articles/physical-training-everything-you-need-to-know',
  date: '2022-05-17T13:44:39.796Z',
  labels: [
    {
      id: 'testLabel',
      name: 'All Guardians',
      type: 'Audience',
    },
  ],
}
