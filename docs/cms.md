TODO: UPDATE

# Content Management

Currently, the Portal content is managed by [Keystone CMS in embedded mode](https://keystonejs.com/docs/walkthroughs/embedded-mode-with-sqlite-nextjs), which allows for some level of dynamic content management but also comes with some restrictions compared to a hosted CMS service. Most notably is that the CMS admin is only accessible via a local development environment, and the content itself is checked into version control alongside the code. This is a temporary state, but for the meantime here are steps for updating content:

1. If you haven't run the site locally before, you may need to [setup your environment](./development.md#environment-setup). If it's been awhile since you have run the site, you may also need to make sure your JS dependencies are up-to-date:
   ```
   yarn install
   ```
1. As with the [development workflow](./development.md#working-on-an-issue), check out a new branch to make your changes. It's helpful to give the branch a descriptive name, such as `add-missing-link-urls`:
   ```
   git checkout -b add-missing-link-urls
   ```
1. Start the Portal application and Keystone Admin simultaneously with:
   ```
   yarn dev
   ```
   At this point, if there are any errors, make sure you've run `yarn install`. If you are still having issues then ping an engineer in Slack for help.
1. When `yarn dev` starts, it will output a bunch of logs as it starts both the Portal development server and the Keystone server. Once they're ready, you should be able to access both at:

   - http://localhost:3000 (Portal)
   - http://localhost:8000 (Keystone Admin)

   > Note: you may also see a bunch of warnings that start with:
   >
   > ```
   > DEPRECATION WARNING: Using / for division is deprecated and will be removed in Dart Sass 2.0.0.
   > ```
   >
   > You can disregard these.

1. At this point, you can go to the Keystone Admin and make the content changes that are needed. You can also view the Portal site to verify they are showing up as expected.
1. Once the content changes are ready, commit your changes and push them up to Github. The only file that should have changes is `cms.db` (this is the CMS database).
   ```
   git add cms.db
   git commit -m "Your commit message (be descriptive)!"
   git push
   ```
1. Open a pull request on Github. This will be subject to all of the same checks and tests as code changes, including [PR linting](./development#pr-linting), so make sure your PR title is formatted correctly. Content changes should use the `chore(content)` prefix:
   ```
   chore(content): <description of changes>
   ```
   When you open the PR, the engineering team will automatically be requested as reviewers. Once it's passed all required checks and been approved, it can be merged and your content change is complete!
   > Note: even after being merged, changes won't show up in environments until they've been deployed.

If you have any issues with the above steps, remember you can always ask for help in Slack!
