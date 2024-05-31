import axios from "axios";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const username = req.query.username as string;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Username query parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = response.data;

    // Sort repositories by stargazers_count in descending order
    const sortedRepos = repos.sort(
      (a: any, b: any) => b.stargazers_count - a.stargazers_count
    );

    // Take the top 10 repositories
    const top10Repos = sortedRepos.slice(0, 10).map((repo: any) => ({
      html_url: repo.html_url,
      created_at: repo.created_at,
      clone_url: repo.clone_url,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      description: repo.description,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      license: repo.license ? repo.license.name : "No license",
    }));

    return res.status(200).json({ data: top10Repos });
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching repositories" });
  }
});

export default router;
