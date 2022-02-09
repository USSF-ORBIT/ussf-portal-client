import { useEffect, useState } from 'react'
import axios from 'axios'

export type RSSNewsItem = {
  id?: string
  desc?: string
  date?: string
  link?: string
  title?: string
  image?: string
}

export const useRSSFeed = (feedUrl: string) => {
  const [items, setItems] = useState<RSSNewsItem[]>([])

  // Fetch RSS items on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(feedUrl)

        // Process XML items
        const xml = new window.DOMParser().parseFromString(
          response.data,
          'text/xml'
        )
        const items = xml.querySelectorAll('item')

        // Process SpaceForce.mil news items
        const newsItems: RSSNewsItem[] = []
        items.forEach((el) => {
          const id = el.querySelector('guid')?.textContent || ''
          const title = el.querySelector('title')?.textContent || ''
          const link = el.querySelector('link')?.textContent || ''
          const image = el.querySelector('enclosure')?.getAttribute('url') || ''

          // Truncate before the first <br /> tag
          const desc =
            el.querySelector('description')?.innerHTML.split('&lt;br')[0] || ''

          // Formate date: MMM DD, YYYY
          const date = el.querySelector('pubDate')?.textContent
          const formattedDate =
            (date &&
              new Date(date).toLocaleString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })) ||
            ''

          newsItems.push({
            id,
            title,
            link,
            desc,
            date: formattedDate,
            image,
          })
        })

        setItems(newsItems)
      } catch (e) {
        console.error('Error fetching RSS feed', e)
      }
    }
    fetchItems()
  }, [])

  return items
}
