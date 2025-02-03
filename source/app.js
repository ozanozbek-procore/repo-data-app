import 'dotenv/config';
import { Octokit } from 'octokit';

const app = async (configuration, verbose = false) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  });

  const data = {};
  
  verbose && console.log(`Fetching ${configuration.repositories.length} repositories.`);
  
  for (const repository of configuration.repositories) {
    verbose && console.log(`  Fetching '${repository}'...`);
    data[repository] = (await octokit.paginate('GET /repos/{owner}/{repo}/pulls', {
        owner: configuration.owner,
        repo: repository,
        per_page: 100,
        state: 'closed'
      }))
      .filter(pr => pr.title.includes(configuration.prTitleString))
      .map(({ url, title, created_at, closed_at }) => ({ url, title, created_at, closed_at }));
    verbose && console.log(`  Done.`);
  }

  verbose && console.log(`Done.`);

  return data;
};

export default app;