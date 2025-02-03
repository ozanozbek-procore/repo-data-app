import 'dotenv/config';
import { Octokit } from 'octokit';

const app = async (configuration, verbose = false) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  });

  // const data = {};
  // configuration.repositories.forEach(repository => );

  verbose && console.log(`Fetching ${configuration.repositories.length} repositories.`);
  const data = await configuration.repositories.reduce(async (acc, repository) => {  
    verbose && console.log(` Fetching '${repository}'...`);
    acc[repository] = (await octokit.paginate('GET /repos/{owner}/{repo}/pulls', {
      owner: configuration.owner,
      repo: repository,
      per_page: 100,
      state: 'closed'
    })).filter(pr => pr.title.includes(configuration.prTitleString));
    verbose && console.log(` Done.`);
    return acc;
  }, {});
  verbose && console.log(`Done.`);

  return data;
};

export default app;