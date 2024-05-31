"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    if (!username) {
        return res
            .status(400)
            .json({ error: "Username query parameter is required" });
    }
    try {
        const response = yield axios_1.default.get(`https://api.github.com/users/${username}/repos`);
        const repos = response.data;
        // Sort repositories by stargazers_count in descending order
        const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        // Take the top 10 repositories
        const top10Repos = sortedRepos.slice(0, 10).map((repo) => ({
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
    }
    catch (error) {
        console.error("Error fetching repositories:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while fetching repositories" });
    }
}));
exports.default = router;
//# sourceMappingURL=githubRoutes.js.map