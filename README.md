# cat-dog classifier

this project was born from this [one tweet](https://twitter.com/sonnen_konig/status/1657711956743139332?s=46&t=tdKjigfuSqFFkKoOpXqGkg) that said that most animals can be classified as dogs/not dog. now while i do agree wholeheartedly with this statement, i don't think they went far enough with their idea. i think that you can classify every animal as some combination of dog/cat and snake/bear using machine learning algorithms on a training set of 3600+ images, this projects aims to do just that for common animals, as well as images uploaded by users.

## methodology

first, i downloaded the [Cat & Dogs](https://www.kaggle.com/datasets/d4rklucif3r/cat-and-dogs) dataset by @d4rklucif3r on Kaggle. then, using the script in main.py, i trained a DeepNet121 model using [imagei](https://github.com/OlafenwaMoses/ImageAI/tree/master). using the [Animal Image Dataset](https://www.kaggle.com/datasets/iamsouravbanerjee/animal-image-dataset-90-different-animals) by @iamsouravbanerjee, i classified 90 different animal species according to the model and sent the results to a json file.

## credits

* [flask](https://flask.palletsprojects.com/en/2.3.x/) (backend)
* [react](https://react.dev) (frontend)
* [imageai](https://imageai.readthedocs.io/en/latest/) (ml framework)
* [Animal Image Dataset by iamsouravbanerjee](https://www.kaggle.com/datasets/iamsouravbanerjee/animal-image-dataset-90-different-animals)
* [Cat & Dogs by d4rklucif3r](https://www.kaggle.com/datasets/d4rklucif3r/cat-and-dogs)
