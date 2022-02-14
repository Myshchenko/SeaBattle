using API.GameDTOs;
using System.Linq;

namespace API.CheckingLogic
{
    public class CheckShip
    {
        private static string orientatation = "not defined";

        public static bool ShipIsCorrect(PointDTO[] points)
        {
            CheckDirection(points);

            if (orientatation == "not defined")
            {
                return false;
            }

            if (IsCorrect(points))
            {
                return true;
            }

            return false;
        }

        static public void CheckDirection(PointDTO[] points)
        {
            int countX = 0, countY = 0;

            for (int i = 1; i < points.Length; i++)
            {
                if (points[i].X == points[i - 1].X)
                {
                    countX++;
                }
                if (points[i].Y == points[i - 1].Y)
                {
                    countY++;
                }
            }

            if (countX == points.Length - 1)
            {
                orientatation = "Horizontal";
            }
            if (countY == points.Length - 1)
            {
                orientatation = "Vertical";
            }
        }

        public static bool IsCorrect(PointDTO[] points)
        {

            if (orientatation == "Horizontal")
            {
                return CheckHorizontal(points);
            }
            else
            {
                return CheckVertical(points);
            }
        }

        static public bool CheckHorizontal(PointDTO[] points)
        {
            int jsdefhlksdjhfksdhf = 0;

            var sotredArray = points.OrderBy(x => x.Y).ToArray();

            for (int i = 1; i < sotredArray.Length; i++)
            {
                if (sotredArray[i].Y - sotredArray[i-1].Y == 1)
                {
                    jsdefhlksdjhfksdhf++;
                }
            }

            if (jsdefhlksdjhfksdhf == sotredArray.Length - 1)
            {
                return true;
            }

            return false;
        }

        static public bool CheckVertical(PointDTO[] points)
        {
            int jsdefhlksdjhfksdhf = 0;

            var sotredArray = points.OrderBy(x => x.X).ToArray();

            for (int i = 1; i < sotredArray.Length; i++)
            {
                if (sotredArray[i].X - sotredArray[i - 1].X == 1)
                {
                    jsdefhlksdjhfksdhf++;
                }
            }

            if (jsdefhlksdjhfksdhf == sotredArray.Length - 1)
            {
                return true;
            }

            return false;
        }
    }
}
