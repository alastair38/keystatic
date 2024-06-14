// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';
import Logo from './src/components/Logo';
import { block } from '@keystatic/core/content-components';

export default config({
  storage: {
    kind: 'cloud',
  },
  ui: {
    brand: {
      name: 'Testing',
      mark: () => <Logo />,
    },
    navigation: {
      content: ['posts', 'articles'],
      Navigation: ['navigation'],
      'Site settings': ['contact', 'seo'],
    },
  },
  singletons: {
    contact: singleton({
      label: 'Contact',
      path: 'src/content/contact/',
      schema: {
        name: fields.text({ label: 'Site title' }),
        email: fields.text({ label: 'Email' }),
        address: fields.object(
          {
            street: fields.text({ label: 'Street' }),
            city: fields.text({ label: 'City' }),
            state: fields.text({ label: 'State' }),
            postcode: fields.text({ label: 'Postcode' }),
            country: fields.text({ label: 'Country' }),
          },
          {
            label: 'Address',
            description: 'The address of the user',
            layout: [12, 6, 3, 3, 12],
          }
        ),
        socialLinks: fields.array(
          fields.object({
            platform: fields.text({ label: 'Platform' }),
            profileLink: fields.text({ label: 'Profile link' }),
          }),

          {
            label: 'Social links',
            itemLabel: item => item.fields.platform.value || '',
          }
        ),
      },
    }),
    seo: singleton({
      label: 'SEO',
      path: 'src/content/seo/',
      schema: {
        title: fields.text({
          label: 'Site title',
          description:
            'This is how you want your site to known to search engines',
        }),
        description: fields.text({
          label: 'Description',
          description:
            'This will be used as the description for search engines if a given page does not have a description of its own',
        }),
        logo: fields.image({
          label: 'Logo',
          description: 'This is the website logo',
          publicPath: './',
        }),
        logoAlt: fields.text({
          label: 'Logo alt text',
          description:
            'This is the text that will used by screen readers and should be a description of what is in the logo image',
        }),
        socialImage: fields.image({
          label: 'Social Image',
          description:
            'This is the default image that will be used when you share a page to social media (if a page does not have a featured image of its own). Images should be landscape, in the region of a 16:9 ratio and at least 1,200 x 675 pixels',
          publicPath: './',
        }),
        socialImageAlt: fields.text({
          label: 'Social image alt text',
          description:
            'This is the text that will used by screen readers and should be a description of what is in the image',
        }),
      },
    }),
    navigation: singleton({
      label: 'Main Navigation',
      path: 'src/content/navigation/',
      schema: {
        links: fields.blocks(
          {
            // First block option is a link to a Page
            page: {
              label: 'Internal link',
              schema: fields.object({
                title: fields.text({ label: 'Link text' }),
                url: fields.relationship({
                  label: 'Page',
                  collection: 'articles',
                }),
              }),
              itemLabel: item => item.fields.title.value || '',
            },
            // Second block option is a link to a URL
            url: {
              label: 'External link',
              schema: fields.object({
                title: fields.text({ label: 'Link title' }),
                url: fields.text({ label: 'Link url' }),
              }),
              itemLabel: item => item.fields.title.value || '',
            },
          },
          {
            label: 'Navigation Links',
            description:
              'Add internal page links or external URLs to your main navigation. Drag and drop to rearrange the links order. Each link added requires a title and a URL',
          }
        ),
      },
    }),
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      columns: ['title'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        image: fields.image({
          label: 'Image',
          directory: 'src/assets/images/posts',

          // Use the @assets path alias
          publicPath: '/src/assets/images/posts/',
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*/',
      entryLayout: 'content',
      format: {
        contentField: 'content',
      },
      columns: ['title', 'pubData'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.object({
          image: fields.image({ label: 'Image' }),
          alt: fields.text({ label: 'Alt text' }),
        }),
        pubData: fields.date({ label: 'Published date' }),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              directory: '',
            },
          },
          components: {
            Card: block({
              label: 'Card',
              schema: {
                title: fields.text({ label: 'Title' }),
                body: fields.text({ label: 'Text' }),
                href: fields.text({ label: 'Link' }),
              },
              ContentView: props => <div>{props.value.title}</div>,
            }),
          },
        }),
      },
    }),
  },
});
