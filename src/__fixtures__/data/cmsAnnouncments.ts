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
