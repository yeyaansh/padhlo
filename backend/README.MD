<!--  This is the Read Me File -->
.env
README.md
index.js
src-
    |- components-
    |             |- images-
    |                       |- darkMode (png images)
    |                       |- lightMode (png images)
    |
    |
    |- config-
    |         |- dbConnect.js
    |         |- redisConnect.js
    |
    |- controllers-
    <!-- |              |- bulkScrapper.js (accessed by only admin)                -->
    |              |- problemRouterFunctions.js
    <!-- |              |- urlScrapper.js (accessed by user and admin) -->
    |              |- userAuthen.js
    |              |- userSubmissionFunction.js
    |
    |- middleware-
    |             |- adminMiddleware.js
    |             |- userMiddleware.js
    |
    |- models-
    <!-- |         |- popularSheetSchema.js -->
    |         |- problemSchema.js
    <!-- |         |- urlSchema.js -->
    |         |- userSchema.js
    |         |- userSubmissionSchema.js
    |
    |- routes-
    <!-- |         |- osmosisRouter.js -->
    |         |- problemRouter.js
    |         |- userAuth.js
    |         |- userSubmission.js
    |
    |- utils-
    |         |- expireCookie.js
    <!-- |         |- fileterURL.js -->
    |         |- genCookie.js
    |         |- judgeZero.js
    |         |- problemUtility.js
    <!-- |         |- scrapperTools.js -->
    |         |- validate.js
   

    |- models-
             |- problemSchema.js // how problems along with their attributes and solutions stored and who created this problem (along with their userID using Schema.Types.ObjectId)
             |
             |- userSchema.js // information about the user along with the relation with problemSchema (to collect the uniques problems attempted (or solved))
             |
             |- userSubmissionSchema.js // when user hit submit button then the user's Id && problem's Id will be stored in database and on successful compilation, additional data will also be saved on it.
             Created an explicit uniqueness by indexing it on (user:1 && problemId:1), this helps lookup fast by using userId, it will show all the problems attempted by the user, i.e. fast lookup.
             User along with their attempted problemsId




A bit confusion between these:-
problemRouter.get("/solvedProblems",userMiddleware, solvedProblems);
problemRouter.get("/submittedProblem/:id",userMiddleware,submittedProblem);


URL is an inbuilt JS API which takes url as input and performs various operations on it.
<!-- e.g. new URL(url) -->




Future improvements:-->
1. Osmosis Feature:
a. Add feature to share your personal(private) curated problems with other users(to public).
b. And based on views, likes, shares, the curated problem list will appear in top popular sheets on the platform.
c. Later if people found your list helpful then they can support you by providing money.


      => in URL Scrapper
      const popularSheets = req.body.collectionName;
      const data = {info: {...problemToUpload, }};
      => in URL Scrapper


2. Users Schema:
a. Create a playlist or problemCollection array field, which stores the playlist of questions created or saved by user. And add playlistThumbnail field to store thumbnail for those playlist (this may be addeed to premium feature).

3. Paid Features:
a. add the feature of muliple problems to save on one click in the existing playlist or new playlist(for premium users)

4. Security:
a. Rate Limiter using Redis, 5 seconds delay between every sumbission and number of requests a user can make (to prevent API exploitation)

5. Slug URL:
a. Your current url seems non readable to human and also it is not SEO friendly, to do that you need to create Slug URL feature so that instead of showing "https://xyz.com/problem/fd425348df3", it could show "https://xyz.com/problem/two-sum-8df3"