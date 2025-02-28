using Application.Dtos;
using Application.Dtos.ArticleComment;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Database.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Application.Controllers;

[Route("api/articleComments")]
public class ArticleCommentsController(
    IRepository<ArticleComment> articleCommentsRepository,
    IDtoAdapter<ArticleComment, ArticleCommentDto, ArticleCommentCreateDto, ArticleCommentDto, ListFiltersDto>
        articleCommentsDtoAdapter)
    : BaseCrudController<ArticleComment, ArticleCommentDto, ArticleCommentCreateDto, ArticleCommentDto, ListFiltersDto>(
        articleCommentsRepository,
        articleCommentsDtoAdapter)
{
}