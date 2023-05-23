# cat-dog classifier

this project was born from this [one tweet](https://twitter.com/sonnen_konig/status/1657711956743139332?s=46&t=tdKjigfuSqFFkKoOpXqGkg) that said that most animals can be classified as dogs/not dog. now while i do agree wholeheartedly with this statement, i don't think they went far enough with their idea. i think that you can classify every animal as some combination of dog/cat and snake/bear using machine learning algorithms on a training set of 3600+ images, this projects aims to do just that for common animals, as well as images uploaded by users.

## methodology

first, i downloaded the <!--[Animals Detection Images Dataset](https://www.kaggle.com/datasets/antoreepjana/animals-detection-images-dataset?resource=download) dataset by @antoreepjana and !-->[Dog and Cat Detection](https://www.kaggle.com/datasets/andrewmvd/dog-and-cat-detection) dataset by @andrewmvd from Kaggle. then, using the script in main.py, i transformed the data into a format usable with the [imagei package](https://github.com/OlafenwaMoses/ImageAI/tree/master).

## credits

* [flask](https://flask.palletsprojects.com/en/2.3.x/) (backend)
* [react](https://react.dev) (frontend)
* [imageai](https://imageai.readthedocs.io/en/latest/) (ml framework)
<!--* [Animals Detection Images Dataset by antoreepjana](https://www.kaggle.com/datasets/antoreepjana/animals-detection-images-dataset?resource=download) (animals training set)!-->
* [Dog and Cat Detection by andrewmvd](https://www.kaggle.com/datasets/andrewmvd/dog-and-cat-detection) (dog and cat training set)
