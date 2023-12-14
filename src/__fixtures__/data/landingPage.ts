import { DateTime } from 'luxon'

export const mockLandingPage = {
  __typename: 'LandingPage',
  pageTitle: 'Test Landing Page',
  pageDescription:
    'em ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac odio ultrices, varius diam at, iaculis sapien. Integer risus quam, congue quis nibh in, iaculis ultrices justo. Sed viverra, massa in finibus vehicula, odio dui fringilla tellus, nec consequat arcu nulla eu augue. Maecenas at ornare orci. Aenean mattis et sapien at vulputate. Sed vel arcu at lorem consequat pulvinar quis ac ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo eros eget gravida hendrerit. Suspendisse facilisis odio vel lacus mollis condimentum. Proin in lectus et erat congue luctus non et ligula. Aenean elementum, risus quis tristique cursus, metus leo ornare sem, ut convallis dui velit sit amet mauris.',
  slug: 'a-page',
  publishedDate: DateTime.now().toISO(),
  status: 'Published',
  documents: [
    {
      __typename: 'DocumentSection',
      title: 'Doc Section',
      document: [
        {
          __typename: 'Document',
          title: 'First Doc',
          file: {
            __typename: 'FileFieldOutput',
            filename: 'lnn-VqnHpSEBwq3H3vAYqX.pdf',
            url: 'http://localhost:3001/files/lnn-VqnHpSEBwq3H3vAYqX.pdf',
          },
        },
      ],
    },
  ],
  collections: [
    {
      __typename: 'Collection',
      title: 'Career',
      bookmarks: [
        {
          __typename: 'Bookmark',
          description: 'Manage your desired career path.',
          url: 'https://myvector.us.af.mil/myvector/Home/Dashboard',
          label: 'MyVector',
        },
        {
          __typename: 'Bookmark',
          description: 'A one page summary of your career found on AMS',
          url: 'https://afpcsecure.us.af.mil/',
          label: 'SURF',
        },
        {
          __typename: 'Bookmark',
          description: 'View PCS orders through vMPF.',
          url: 'https://afpcsecure.us.af.mil/',
          label: 'Orders',
        },
        {
          __typename: 'Bookmark',
          description: 'View EPRs/OPRs in PRDA.',
          url: 'https://mypers.af.mil',
          label: 'EPRs/OPRs',
        },
        {
          __typename: 'Bookmark',
          description: 'The official location of your personnel records.',
          url: 'https://mypers.af.mil',
          label: 'PRDA',
        },
        {
          __typename: 'Bookmark',
          description: 'The official source of Human Resources information.',
          url: 'https://mypers.af.mil/',
          label: 'MyPers',
        },
      ],
    },
    {
      __typename: 'Collection',
      title: 'Medical & Dental',
      bookmarks: [
        {
          __typename: 'Bookmark',
          description: 'View and update your virtual record of emergency data.',
          url: 'https://mypers.af.mil',
          label: 'vRED',
        },
        {
          __typename: 'Bookmark',
          description: 'Make appointments and communicate with your MTF.',
          url: 'https://www.tricareonline.com/tol2/prelogin/desktopIndex.xhtml',
          label: 'TriCare Online (TOL)',
        },
        {
          __typename: 'Bookmark',
          description: '',
          url: 'https://asimsimr.health.mil/',
          label: 'Dental',
        },
        {
          __typename: 'Bookmark',
          description: 'View your PT Test scores.',
          url: 'https://myfss.us.af.mil/USAFCommunity/s/usaf-fitness-management',
          label: 'PT Tests',
        },
        {
          __typename: 'Bookmark',
          description:
            'Review personal, health care, and personnel information from one reliable source, the Defense Enrollment Eligibility Reporting System (DEERS)',
          url: 'https://milconnect.dmdc.osd.mil/milconnect/',
          label: 'MilConnect',
        },
      ],
    },
    {
      __typename: 'Collection',
      title: 'Life & Fitness',
      bookmarks: [
        {
          __typename: 'Bookmark',
          description: 'Make appointments and communicate with your MTF.',
          url: 'https://www.tricareonline.com/tol2/prelogin/desktopIndex.xhtml',
          label: 'TriCare Online (TOL)',
        },
        {
          __typename: 'Bookmark',
          description: 'View your PT Test scores.',
          url: 'https://myfss.us.af.mil/USAFCommunity/s/usaf-fitness-management',
          label: 'PT Tests',
        },
        {
          __typename: 'Bookmark',
          description:
            'Review personal, health care, and personnel information from one reliable source, the Defense Enrollment Eligibility Reporting System (DEERS)',
          url: 'https://milconnect.dmdc.osd.mil/milconnect/',
          label: 'MilConnect',
        },
        {
          __typename: 'Bookmark',
          description: 'The tracking system for requesting and tracking leave.',
          url: 'https://leave.af.mil/profile',
          label: 'LeaveWeb',
        },
        {
          __typename: 'Bookmark',
          description:
            'The new customer relationship management portal for all A1 mission area functions and applications',
          url: 'https://myfss.us.af.mil/USAFCommunity/s/',
          label: 'MyFSS',
        },
        {
          __typename: 'Bookmark',
          description:
            'MyPay allows you to manage your pay information, leave and earning statements, W-2s, and more.',
          url: 'https://mypay.dfas.mil/#/',
          label: 'MyPay',
        },
        {
          __typename: 'Bookmark',
          description: 'View and change your TSP allotments and balances.',
          url: 'https://www.tsp.gov/',
          label: 'TSP',
        },
      ],
    },
    {
      __typename: 'Collection',
      title: 'Outprocessing',
      bookmarks: [
        {
          __typename: 'Bookmark',
          description: 'View PCS orders through vMPF.',
          url: 'https://afpcsecure.us.af.mil/',
          label: 'Orders',
        },
        {
          __typename: 'Bookmark',
          description: 'View your out-processing checklist on vMPF.',
          url: 'https://afpcsecure.us.af.mil/',
          label: 'Outprocessing Checklists',
        },
        {
          __typename: 'Bookmark',
          description: '',
          url: 'https://afpcsecure.us.af.mil/',
          label: 'Assignments',
        },
        {
          __typename: 'Bookmark',
          description: 'Access all your PCS info.',
          url: 'https://www.move.mil/',
          label: 'Move.mil',
        },
        {
          __typename: 'Bookmark',
          description:
            'Department of Defense-funded program providing comprehensive information on every aspect of military life at no cost to active duty, the National Guard, Reserve members, and their families. ',
          url: 'http://www.militaryonesource.mil/',
          label: 'Military Onesource',
        },
        {
          __typename: 'Bookmark',
          description:
            'Provides information, tools, and training to ensure service members, and their spouses, are prepared for the next step in civilian life.',
          url: 'https://www.afpc.af.mil/Separation/Transition-Assistance-Program/ ',
          label: 'TAP',
        },
      ],
    },
    {
      __typename: 'Collection',
      title: 'vMPF',
      bookmarks: [
        {
          __typename: 'Bookmark',
          description: 'Manage your desired career path.',
          url: 'https://myvector.us.af.mil/myvector/Home/Dashboard',
          label: 'MyVector',
        },
        {
          __typename: 'Bookmark',
          description: 'A one page summary of your career found on AMS',
          url: 'https://afpcsecure.us.af.mil/',
          label: 'SURF',
        },
        {
          __typename: 'Bookmark',
          description: 'The official location of your personnel records.',
          url: 'https://mypers.af.mil',
          label: 'PRDA',
        },
        {
          __typename: 'Bookmark',
          description: 'The official source of Human Resources information.',
          url: 'https://mypers.af.mil/',
          label: 'MyPers',
        },
        {
          __typename: 'Bookmark',
          description: '',
          url: 'https://afpcsecure.us.af.mil/',
          label: 'Assignments',
        },
      ],
    },
  ],
  articles: [
    {
      __typename: 'FilteredArticles',
      title: 'Test Page',
      slug: 'test-page',
      preview: 'Preview text',
      publishedDate: '2023-11-14T16:27:58.869Z',
      status: 'Published',
      labels: [
        {
          __typename: 'ArticleLabel',
          id: 'clp054h890328sfnmp15e1pg5',
          name: 'One',
          type: 'Source',
        },
      ],
    },
    {
      __typename: 'FilteredArticles',
      title: 'Another test',
      slug: 'article-two',
      preview:
        'em ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac odio ultrices, varius diam at, iaculis sapien. Integer risus quam, congue quis nibh in, iaculis ultrices justo. Sed viverra, massa in finibus vehicula, odio dui fringilla tellus, nec consequat arcu nulla eu augue. Maecenas at ornare orci. Aenean mattis et sapien at vulputate. Sed vel arcu at lorem consequat pulvinar quis ac ante. Orci varius natoque penatibus et magnis dis parturient montes,',
      publishedDate: '2023-11-15T18:59:30.100Z',
      status: 'Published',
      labels: [],
    },
  ],
}
