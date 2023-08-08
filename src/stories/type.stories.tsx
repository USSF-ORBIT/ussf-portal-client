import React from 'react'
import type { Meta } from '@storybook/react'

export default {
  title: 'Global/Typography',
} as Meta

export const Typeface = () => {
  return (
    <section style={{ fontFamily: 'Sharp Sans' }}>
      <h1>Font</h1>
      <p>
        Typeface:{' '}
        <a
          href="https://sharptype.co/typefaces/sharp-sans"
          target="_blank"
          rel="noreferrer noopener">
          Sharp Sans
        </a>
      </p>

      <p>
        The quick brown fox jumped over the lazy dog.
        <br />
        Sharp Sans, normal, 400 (Book)
      </p>
      <p style={{ fontWeight: 500 }}>
        The quick brown fox jumped over the lazy dog.
        <br />
        Sharp Sans, normal, 500 (Medium)
      </p>
      <p style={{ fontWeight: 700 }}>
        The quick brown fox jumped over the lazy dog.
        <br />
        Sharp Sans, normal, 700 (Bold)
      </p>

      <p style={{ fontStyle: 'italic' }}>
        The quick brown fox jumped over the lazy dog.
        <br />
        Sharp Sans, italic, 400 (Book)
      </p>
      <p style={{ fontWeight: 500, fontStyle: 'italic' }}>
        The quick brown fox jumped over the lazy dog.
        <br />
        Sharp Sans, italic, 500 (Medium)
      </p>
      <p style={{ fontWeight: 700, fontStyle: 'italic' }}>
        The quick brown fox jumped over the lazy dog.
        <br />
        Sharp Sans, italic, 700 (Bold)
      </p>
    </section>
  )
}

export const Headers = () => {
  return (
    <section>
      <h1>Headers</h1>
      <h1>The quick brown fox jumped over the lazy dog.</h1>
      <p>h1 / 40px / 700 (Bold)</p>

      <h2>The quick brown fox jumped over the lazy dog.</h2>
      <p>h2 / 32px / 700 (Bold)</p>

      <h3>The quick brown fox jumped over the lazy dog.</h3>
      <p>h3 / 22px / 700 (Bold)</p>

      <h4>The quick brown fox jumped over the lazy dog.</h4>
      <p>h4 / 16px / 700 (Bold)</p>

      <h5>The quick brown fox jumped over the lazy dog.</h5>
      <p>h5 / 15px / 400 (Book)</p>

      <h6>The quick brown fox jumped over the lazy dog.</h6>
      <p>h6 / 13px / 400 (Book)</p>
    </section>
  )
}

export const Prose = () => {
  return (
    <section>
      <h1>Prose</h1>
      <div className="usa-line-length-example">
        <h3 className="site-preview-heading margin-top-0">Line length</h3>
        <section className="typography-example usa-prose margin-top-1 usa-prose">
          <p>
            <strong>75 characters (68ex) max-width:</strong> Yosemite National
            Park is set within California’s Sierra Nevada mountains. It’s famed
            for its giant, ancient sequoias, and for Tunnel View, the iconic
            vista of towering Bridalveil Fall and the granite cliffs of El
            Capitan and Half Dome.
          </p>
        </section>
      </div>

      <h3 className="site-preview-heading">Spacing</h3>
      <section className="usa-prose margin-top-1 font-sans-sm measure-3">
        <h1>Page heading</h1>
        <p className="usa-intro">
          Great Smoky Mountains National Park straddles the border of North
          Carolina and Tennessee.
        </p>

        <h2>Section heading</h2>

        <h3>Section of the page</h3>
        <p>
          The sprawling landscape encompasses lush forests and an abundance of
          wildflowers that bloom year-round. Streams, rivers and waterfalls
          appear along hiking routes that include a segment of the Appalachian
          Trail.
        </p>

        <h4>Subsection of the page</h4>
        <p>
          World renowned for its diversity of plant and animal life, the beauty
          of its ancient mountains, and the quality of its remnants of Southern
          Appalachian mountain culture, this is America’s most visited national
          park.
        </p>
        <p>
          Right now scientists think that we only know about 17 percent of the
          plants and animals that live in the park, or about 17,000 species of a
          probable 100,000 different organisms.
        </p>

        <h5>Subsection of the page</h5>
        <p>
          Entrance to Great Smoky Mountains National Park is free. The park is
          one of the few national parks where no entrance fees are charged.
        </p>

        <ul>
          <li>Unordered list item</li>
          <li>Unordered list item</li>
          <li>
            Unordered list item
            <ul>
              <li>Nested unordered list item</li>
              <li>
                Nested unordered list item
                <ul>
                  <li>3rd level nesting</li>
                  <li>3rd level nesting</li>
                  <li>3rd level nesting</li>
                </ul>
              </li>
              <li>Nested unordered list item</li>
              <li>Nested unordered list item</li>
            </ul>
          </li>
        </ul>

        <p>
          Right now scientists think that we only know about 17 percent of the
          plants and animals that live in the park, or about 17,000 species of a
          probable 100,000 different organisms.
        </p>

        <ol>
          <li>Ordered list item</li>
          <li>
            Ordered list item
            <ol>
              <li>Nested ordered list item</li>
              <li>Nested ordered list item</li>
              <li>Nested ordered list item</li>
              <li>Nested ordered list item</li>
            </ol>
          </li>
          <li>Ordered list item</li>
        </ol>

        <table>
          <caption>Bordered table</caption>
          <thead>
            <tr>
              <th scope="col">Document title</th>
              <th scope="col">Description</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Declaration of Independence</th>
              <td>
                Statement adopted by the Continental Congress declaring
                independence from the British Empire.
              </td>
              <td>1776</td>
            </tr>
            <tr>
              <th scope="row">Bill of Rights</th>
              <td>
                The first ten amendments of the U.S. Constitution guaranteeing
                rights and freedoms.
              </td>
              <td>1791</td>
            </tr>
            <tr>
              <th scope="row">Declaration of Sentiments</th>
              <td>
                A document written during the Seneca Falls Convention outlining
                the rights that American women should be entitled to as
                citizens.
              </td>
              <td>1848</td>
            </tr>
            <tr>
              <th scope="row">Emancipation Proclamation</th>
              <td>
                An executive order granting freedom to slaves in designated
                southern states.
              </td>
              <td>1863</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  )
}

/* eslint-disable jsx-a11y/anchor-is-valid */

export const Links = () => {
  return (
    <>
      <section>
        <h1 className="padding-left-2">Links</h1>
        <div className="padding-2 padding-top-0">
          <p>
            This is{' '}
            <a className="usa-link" href="javascript:void(0);">
              a text link
            </a>{' '}
            on a standard background.
          </p>

          <p>
            This is{' '}
            <a
              className="usa-link usa-color-text-visited"
              href="javascript:void(0);">
              a visited link
            </a>
            .
          </p>

          <p>
            This is a link that goes to an{' '}
            <a
              className="usa-link usa-link--external"
              href="https://i.giphy.com/media/WPzQF6ruiIIVzHNlwX/source.gif">
              external website
            </a>
            .
          </p>
        </div>
      </section>
      <section className="usa-dark-background padding-2">
        <p>
          This is{' '}
          <a className="usa-link" href="javascript:void(0);">
            a text link
          </a>{' '}
          on a dark background.
        </p>

        <p>
          This is{' '}
          <a
            className="usa-link usa-color-text-visited"
            href="javascript:void(0);">
            a visited link
          </a>
          .
        </p>

        <p>
          This is a link that goes to an{' '}
          <a
            className="usa-link usa-link--external"
            href="https://i.giphy.com/media/WPzQF6ruiIIVzHNlwX/source.gif">
            external website
          </a>
          .
        </p>
      </section>
    </>
  )
}

export const Lists = () => {
  return (
    <section>
      <h1>Lists</h1>
      <div className="grid-row grid-gap">
        <div className="mobile-lg:grid-col-4">
          <h3 className="site-preview-heading margin-0">Unordered list</h3>
          <ul className="usa-list">
            <li>Unordered list item</li>
            <li>Unordered list item</li>
            <li>Unordered list item</li>
          </ul>
        </div>

        <div className="mobile-lg:grid-col-4 margin-top-4 mobile-lg:margin-top-0">
          <h3 className="site-preview-heading margin-0">Ordered list</h3>
          <ol className="usa-list">
            <li>Ordered list item</li>
            <li>Ordered list item</li>
            <li>Ordered list item</li>
          </ol>
        </div>

        <div className="mobile-lg:grid-col-4 margin-top-4 mobile-lg:margin-top-0">
          <h3 className="site-preview-heading margin-0">Unstyled list</h3>
          <ul className="usa-list usa-list--unstyled">
            <li>Unstyled list item</li>
            <li>Unstyled list item</li>
            <li>Unstyled list item</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
