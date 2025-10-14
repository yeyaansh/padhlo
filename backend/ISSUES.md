1. I think one thing could be the issue, when an Admin (who haven't created the problem) trying to update it and the backend allows it because the backend doesn't checked whether the admin created that problem or not.
2. Same with deleting the problem
3. How to throw the errors, the right status code which could handle different error within the same try-catch block!
4. Add Acceptance Rate to each problems use new fields like attempted and solved to the problem to get the value for acceptance rate
5. When submitting or running the solution, if the solution is not correct my beckend before sending the main or final res.status.send(), it throws this error "AxiosError: Request failed with status code 400  error Request failed with status code 400"
{{ 4. for this time we skipped the problemsAttemptedPart}}