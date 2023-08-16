export const cmsAnnouncementsMock = [
  {
    id: '1',
    title: 'Test Announcement',
    status: 'Published',
    body: {
      document: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
          ],
        },
      ],
    },
    publishedDate: '2022-06-21T21:56:55.926Z',
  },
  {
    id: '2',
    title: 'Test 2',
    status: 'Draft',
    body: {
      document: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
          ],
        },
      ],
    },
    publishedDate: '2022-06-20T21:56:55.926Z',
  },
]

export const testAnnouncementWithUrl = {
  id: 'testAnnouncement123',
  title: 'Test Announcement',
  body: {
    document: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
        ],
      },
      {
        type: 'component-block',
        props: {
          link: {
            value: 'https://www.google.com',
            discriminant: 'url',
          },
          ctaText: 'View more',
        },
        children: [
          {
            type: 'component-inline-prop',
            children: [
              {
                text: '',
              },
            ],
          },
        ],
        component: 'callToAction',
      },
      {
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  status: 'Published',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

export const testAnnouncementWithArticle = {
  id: 'anotherTest123',
  title: 'Cool new article',
  body: {
    document: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas',
          },
        ],
      },
      {
        type: 'component-block',
        props: {
          link: {
            value: {
              id: 'cl4ydwrah1780zhrimycrfati',
              data: {
                slug: 'something',
              },
            },
            discriminant: 'article',
          },
          ctaText: 'View article',
        },
        children: [
          {
            type: 'component-inline-prop',
            children: [
              {
                text: '',
              },
            ],
          },
        ],
        component: 'callToAction',
      },
      {
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  status: 'Published',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

export const testAnnouncementWithArticleNoSlug = {
  id: 'anotherTest1234',
  title: 'Cool new article',
  body: {
    document: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas',
          },
        ],
      },
      {
        type: 'component-block',
        props: {
          link: {
            value: {
              id: 'cl4ydwrah1780zhrimycrfati',
              data: {
                slug: '',
              },
            },
            discriminant: 'article',
          },
          ctaText: 'View article',
        },
        children: [
          {
            type: 'component-inline-prop',
            children: [
              {
                text: '',
              },
            ],
          },
        ],
        component: 'callToAction',
      },
      {
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  status: 'Published',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

export const testAnnouncementWithDeletedArticle = {
  id: 'anotherTest123',
  title: 'Cool new deleted article',
  body: {
    document: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas',
          },
        ],
      },
      {
        type: 'component-block',
        props: {
          link: {
            // missing article data, like when the article is deleted but the announcement still refers to it
            value: {},
            discriminant: 'article',
          },
          ctaText: 'View deleted article',
        },
        children: [
          {
            type: 'component-inline-prop',
            children: [
              {
                text: '',
              },
            ],
          },
        ],
        component: 'callToAction',
      },
      {
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  status: 'Published',
  publishedDate: '2022-05-17T13:44:39.796Z',
}

export const testAnnouncementWithDocument = {
  id: 'testAnnouncementDocument',
  title: 'Test Announcement Document',
  body: {
    document: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
        ],
      },
      {
        type: 'component-block',
        props: {
          link: {
            value: {
              data: {
                file: {
                  url: 'https://test.com/file.pdf',
                },
              },
            },
            discriminant: 'document',
          },
          ctaText: 'Read more',
        },
        children: [
          {
            type: 'component-inline-prop',
            children: [
              {
                text: '',
              },
            ],
          },
        ],
        component: 'callToAction',
      },
      {
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  status: 'Published',
  publishedDate: '2022-05-17T13:44:39.796Z',
}
