import 'dotenv/config';
import { Octokit } from 'octokit';

const app = async (configuration) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  });

  // const data = {};
  // configuration.repositories.forEach(repository => );

  console.log(`Fetching ${configuration.repositories.length} repositories.`);
  const data = await configuration.repositories.reduce(async (acc, repository) => {  
    console.log(` Fetching '${repository}'...`);
    acc[repository] = (await octokit.paginate('GET /repos/{owner}/{repo}/pulls', {
      owner: configuration.owner,
      repo: repository,
      per_page: 100,
      state: 'closed'
    })).filter(pr => pr.title.includes(configuration.prTitleString));
    console.log(` Done.`);
    return acc;
  }, {});
  console.log(`Done.`);

  return data;
};

export default app;