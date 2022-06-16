using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Utils.Result
{
    public static class ResultExtensions
    {
        public static Result OnSuccess(this Result result, Action action)
        {
            if(result.IsFailure)
                return result;
            
            action();

            return Result.Ok();
        }

        public static Result<T> OnSuccess<T>(this Result<T> result, Action<T> action)
        {
            if (result.IsSuccess)
            {
                action(result.Value);
            }

            return result;
        }

        public static Result OnSuccess(this Result result, Func<Result> func)
        {
            if (result.IsFailure)
                return result;

            return func();
        }


        public static Result<T> OnSuccess<T>(this Result<T> result, Func<Result<T>> func)
        {
            if (result.IsFailure)
                return result;

            return func();
        }

        public static Result<T> OnFailure<T>(this Result<T> result, Action action)
        {
            if (result.IsFailure)
            {
                action();
            }

            return result;
        }

        public static Result OnFailure(this Result result, Action action)
        {
            if (result.IsFailure)
            {
                action();
            }

            return result;
        }

        public static Result OnBoth(this Result result, Action<Result> action)
        {
            action(result);
            return result;
        }

        public static T OnBoth<T>(this Result result, Func<Result, T> func)
        {
            return func(result);
        }
    }
}
